<?php

namespace App\Http\Controllers;

use App\Models\PlanillaReporte;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected $usuarioActivo;

    public function __construct()
    {
        $this->usuarioActivo = Auth::user();
    }

    public function index()
    {
        $users = DB::table('sigedin.guest.responsable')
            ->select('Correo', 'Nombre', 'Usuario', 'IdResponsable')
            ->where('Estado', 'Activo')
            ->get();

        $usersSet = $users->map(function ($user) {
            return [
                'idResponsable' => $user->IdResponsable,
                'correo' => $user->Correo,
                'nombre' => $user->Nombre,
                'usuario' => $user->Usuario ? (strpos($user->Usuario, '\\') !== false ? explode('\\', $user->Usuario)[1] : $user->Usuario) : ""
            ];
        });

        return response()->json($usersSet);
    }

    public function getUsuariosGerencia()
    {
        try {

            $usuarios = $this->consultaABD([$this->usuarioActivo->oficina]);

            return response()->json($usuarios);
        } catch (\Throwable $th) {
            Log::error('Error al obtener usuarios de gerencia: ' . $th->getMessage());
            return response()->json(['error' => 'Error al obtener usuarios de gerencia.'], 500);
        }
    }

    public function consultaUsuariosXGerencia(Request $request)
    {
        try {
            $usuarios = [];

            if ($this->usuarioActivo->IsAdmin == "1") {
                $usuarios = $this->consultaABD($request->divisiones);
            } else if ($this->usuarioActivo->IsJefe == "1" || $this->usuarioActivo->IdResponsable == "20258") {
                $usuarios = $this->consultaABD([$this->usuarioActivo->oficina]);
            }

            return response()->json([
                'usuarios' => $usuarios,
                'divisiones' => $request->divisiones,
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener usuarios de gerencia: ' . $th->getMessage());
            return response()->json([
                'error' => 'Error al obtener usuarios de gerencia.',
                'message' => $th->getMessage(),
                'ok' => false
            ], 500);
        }
    }

    public function consultaDatosSegunPersonaSeleccionada(Request $request)
    {
        DB::beginTransaction();

        try {
            // Inicialización de variables
            $horasAcumuladas = 0;
            $resultado = [];

            // Generar los rangos de fechas
            $rangosFechas = $this->obtenerRangoFechas($request->anios, $request->meses);

            // Filtro común para ambas consultas
            $filtrosComunes = function ($query) use ($request, $rangosFechas) {
                $query->whereIn('Trabajador', $request->personas)
                    ->when($request->casos, function ($query) use ($request) {
                        return $query->whereIn('Caso', $request->casos);
                    })
                    ->where(function ($query) use ($rangosFechas) {
                        foreach ($rangosFechas as $rango) {
                            $query->orWhereBetween('Fecha', $rango);
                        }
                    });
            };

            // Consulta optimizada: sumar horas por semanas
            $planillaHoras = PlanillaReporte::select(
                DB::raw('YEAR(Fecha) as anio'),
                DB::raw('DATEPART(WEEK, Fecha) as semana'),
                DB::raw('SUM(Horas) as horasDeLaSemana')
            )
                ->where($filtrosComunes)
                ->groupBy(DB::raw('YEAR(Fecha)'), DB::raw('DATEPART(WEEK, Fecha)'))
                ->orderBy(DB::raw('YEAR(Fecha)'), 'asc')
                ->orderBy(DB::raw('DATEPART(WEEK, Fecha)'), 'asc')
                ->chunk(2000, function ($datosHorasUsuarios) use (&$horasAcumuladas, &$resultado) {
                    foreach ($datosHorasUsuarios as $dato) {
                        $horasAcumuladas += $dato->horasDeLaSemana;
                        $resultado[] = [
                            'semana' => 'w' . $dato->semana . '-' . $dato->anio,
                            'horasDeLaSemana' => $dato->horasDeLaSemana,
                            'horasAcumuladas' => $horasAcumuladas
                        ];
                    }
                });

            // Función para concurrencia de Fase o Actividad
            $obtenerConcurrencia = function ($campo) use ($filtrosComunes) {
                return PlanillaReporte::select(
                    $campo,
                    DB::raw('COUNT(' . $campo . ') as concurrencia')
                )
                    ->where($filtrosComunes)
                    ->groupBy($campo)
                    ->get();
            };

            // Obtener concurrencia de Fase y Actividad
            $concurrenciaFase = $obtenerConcurrencia('Fase');
            $concurrenciaAct = $obtenerConcurrencia('Actividad');

            // Obtener datos adicionales
            $dataSWBSTarea = $this->consultaSWBSTarea($request);

            DB::commit();

            return response()->json([
                'semanasData' => $resultado,
                'concurrenciaFase' => $concurrenciaFase,
                'concurrenciaAct' => $concurrenciaAct,
                'dataSWBSTarea' => $dataSWBSTarea->original["data"],
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener datos: ' . $th->getMessage());
            DB::rollBack();

            return response()->json([
                'error' => 'Error al obtener datos.',
                'message' => $th->getMessage(),
                'ok' => false
            ], 500);
        }
    }

    public function consultaABD($divisiones)
    {
        return  DB::table('sigedin.guest.responsable')
            ->join('sigedin.guest.division', 'sigedin.guest.responsable.IdDivision', '=', 'sigedin.guest.division.DivisionID')
            ->select('sigedin.guest.responsable.IdResponsable', 'sigedin.guest.division.DivisionID', 'sigedin.guest.division.DivisionName', 'sigedin.guest.responsable.Correo', 'sigedin.guest.responsable.Nombre', 'sigedin.guest.responsable.Cargo', 'sigedin.guest.responsable.EsJefe', 'sigedin.guest.responsable.IsAdmin', 'sigedin.guest.responsable.Estado', 'sigedin.guest.responsable.Usuario')
            ->whereIn('sigedin.guest.division.DivisionName', $divisiones)
            ->where('sigedin.guest.responsable.Estado', 'Activo')
            ->get();
    }

    public function obtenerRangoFechas($anios, $meses)
    {
        $rangosFechas = collect($anios)->flatMap(function ($anio) use ($meses) {
            return collect($meses)->map(function ($mes) use ($anio) {
                return [
                    Carbon::create($anio, $mes, 1)->startOfMonth(),
                    Carbon::create($anio, $mes, 1)->endOfMonth()
                ];
            });
        });

        return $rangosFechas;
    }

    public function consultaCaso(Request $request)
    {
        try {

            $request->validate([
                'divisiones' => 'required|array',
                'personas' => 'nullable|array',
                'search' => 'required|string'
            ]);

            $divionesInt = array_map('intval', $request->divisiones);

            $casos = PlanillaReporte::select('Caso', DB::raw('MIN(Proyecto) as Proyecto'))
                ->where('Caso', 'like', '%' . $request->search . '%')
                ->whereIn('IdDivision', $divionesInt)
                ->when($request->personas, function ($query) use ($request) {
                    return $query->whereIn('Trabajador', $request->personas);
                })
                ->where('Proyecto', '!=', '')
                ->groupBy('Caso')
                ->get();

            return response()->json([
                'message' => '(consultaCaso) Datos obtenidos correctamente.',
                'data' => $casos,
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            Log::error('(consultaCaso) Error al obtener datos: ' . $th->getMessage());
            return response()->json([
                'error' => 'Error al obtener datos.',
                'message' => $th->getMessage(),
                'ok' => false
            ], 500);
        }
    }

    public function consultaSWBSTarea(Request $request)
    {
        try {
            // Crear los rangos de fechas directamente
            $rangosFechas = $this->obtenerRangoFechas($request->anios, $request->meses);

            // Construir la consulta
            $tareas = PlanillaReporte::select('SWBSPadre', 'Tarea', DB::raw('COUNT(*) as total'))
                ->whereIn('Trabajador', $request->personas)
                ->when($request->casos, function ($query) use ($request) {
                    return $query->whereIn('Caso', $request->casos);
                })->where(function ($query) use ($rangosFechas) {
                    foreach ($rangosFechas as $rango) {
                        $query->orWhereBetween('Fecha', $rango);
                    }
                })->groupBy('Tarea', 'SWBSPadre')->get();

            $SWBSPadres = $tareas->pluck('SWBSPadre')->unique()->values();

            return response()->json([
                'message' => '(consultaSWBSTarea) Datos obtenidos correctamente.',
                'data' => [$tareas, $SWBSPadres],
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            Log::error('(consultaSWBSTarea) Error al obtener datos: ' . $th->getMessage());
            return response()->json([
                'error' => 'Error al obtener datos.',
                'message' => $th->getMessage(),
                'ok' => false
            ], 500);
        }
    }
}