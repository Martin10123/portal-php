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
    public function index()
    {
        $users = DB::table('sigedin.guest.responsable')
            ->select('Correo', 'Nombre', 'Usuario')
            ->where('Estado', 'Activo')
            ->get();

        $usersSet = $users->map(function ($user) {
            return [
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
            $usuarioActivo = Auth::user();

            // Hacer una sola consulta para obtener usuarios activos en la división correcta
            $usuarios = $this->consultaABD($usuarioActivo->oficina);

            return response()->json($usuarios);
        } catch (\Throwable $th) {
            Log::error('Error al obtener usuarios de gerencia: ' . $th->getMessage());
            return response()->json(['error' => 'Error al obtener usuarios de gerencia.'], 500);
        }
    }

    public function consultaUsuariosXGerencia(Request $request)
    {
        try {

            $usuarios = DB::table('sigedin.guest.responsable')
                ->join('sigedin.guest.division', 'sigedin.guest.responsable.IdDivision', '=', 'sigedin.guest.division.DivisionID')
                ->select('sigedin.guest.responsable.IdResponsable', 'sigedin.guest.division.DivisionID', 'sigedin.guest.division.DivisionName', 'sigedin.guest.responsable.Correo', 'sigedin.guest.responsable.Nombre', 'sigedin.guest.responsable.Cargo', 'sigedin.guest.responsable.EsJefe', 'sigedin.guest.responsable.IsAdmin', 'sigedin.guest.responsable.Estado', 'sigedin.guest.responsable.Usuario')
                ->whereIn('sigedin.guest.division.DivisionName', $request->divisiones)
                ->where('sigedin.guest.responsable.Estado', 'Activo')
                ->get();

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
        try {
            $concurrenciaFase = [];
            $horasAcumuladas = 0;
            $resultado = [];
            $rangosFechas = [];
            $concurrenciaAct = [];

            // Recorrer el array de años y meses para generar los rangos de fechas
            foreach ($request->anios as $anio) {
                foreach ($request->meses as $mes) {
                    $inicioMes = Carbon::create($anio, $mes, 1)->startOfMonth(); // Primer día del mes
                    $finMes = Carbon::create($anio, $mes, 1)->endOfMonth();      // Último día del mes

                    $rangosFechas[] = [$inicioMes, $finMes]; // Guardar los rangos
                }
            }

            // Consulta optimizada: Agrupar por semanas y sumar las horas de cada semana
            PlanillaReporte::select(
                DB::raw('YEAR(Fecha) as anio'),  // Obtener el año de la fecha
                DB::raw('DATEPART(WEEK, Fecha) as semana'),  // Obtener la semana del año
                DB::raw('SUM(Horas) as horasDeLaSemana')      // Sumar las horas de cada semana
            )
                ->whereIn('Trabajador', $request->personas)
                ->where(function ($query) use ($rangosFechas) {
                    // Usar whereBetween con or para múltiples rangos de fechas
                    foreach ($rangosFechas as $rango) {
                        $query->whereBetween('Fecha', $rango, 'or');
                    }
                })
                ->groupBy(DB::raw('YEAR(Fecha)'), DB::raw('DATEPART(WEEK, Fecha)'))  // Agrupar por año y semana
                ->orderBy(DB::raw('YEAR(Fecha)'), 'asc')  // Ordenar por año
                ->orderBy(DB::raw('DATEPART(WEEK, Fecha)'), 'asc')  // Ordenar por semana dentro del año
                ->chunk(2000, function ($datosHorasUsuarios) use (&$horasAcumuladas, &$resultado) {
                    foreach ($datosHorasUsuarios as $dato) {
                        $horasAcumuladas += $dato->horasDeLaSemana; // Sumar las horas acumuladas

                        // Concatenar 'w' con el número de la semana y el año
                        $resultado[] = [
                            'semana' => 'w' . $dato->semana . '-' . $dato->anio,  // Semana y año
                            'horasDeLaSemana' => $dato->horasDeLaSemana,
                            'horasAcumuladas' => $horasAcumuladas
                        ];
                    }
                });


            // Consulta para obtener la concurrencia de fases

            $concurrenciaFase = PlanillaReporte::select(
                'Fase',
                DB::raw('COUNT(Fase) as concurrencia')
            )
                ->whereIn('Trabajador', $request->personas)
                ->where(function ($query) use ($rangosFechas) {
                    // Usar whereBetween con or para múltiples rangos de fechas
                    foreach ($rangosFechas as $rango) {
                        $query->whereBetween('Fecha', $rango, 'or');
                    }
                })
                ->groupBy('Fase')
                ->get();

            // Consulta para obtener la concurrencia de act

            $concurrenciaAct = PlanillaReporte::select(
                'Actividad',
                DB::raw('COUNT(Actividad) as concurrencia')
            )
                ->whereIn('Trabajador', $request->personas)
                ->where(function ($query) use ($rangosFechas) {
                    // Usar whereBetween con or para múltiples rangos de fechas
                    foreach ($rangosFechas as $rango) {
                        $query->whereBetween('Fecha', $rango, 'or');
                    }
                })
                ->groupBy('Actividad')
                ->get();


            return response()->json([
                'semanasData' => $resultado,
                'concurrenciaFase' => $concurrenciaFase,
                'ok' => true,
                'concurrenciaAct' => $concurrenciaAct
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener datos: ' . $th->getMessage());
            return response()->json([
                'error' => 'Error al obtener datos.',
                'message' => $th->getMessage(),
                'ok' => false
            ], 500);
        }
    }


    public function consultaABD($oficina)
    {
        return DB::table('sigedin.guest.responsable')
            ->join('sigedin.guest.division', 'sigedin.guest.responsable.IdDivision', '=', 'sigedin.guest.division.DivisionID')
            ->select('sigedin.guest.responsable.IdResponsable', 'sigedin.guest.responsable.Correo', 'sigedin.guest.responsable.Nombre', 'sigedin.guest.responsable.Cargo', 'sigedin.guest.responsable.EsJefe', 'sigedin.guest.responsable.IsAdmin', 'sigedin.guest.responsable.Estado', 'sigedin.guest.responsable.Usuario')
            ->where('sigedin.guest.division.DivisionName', $oficina)
            ->where('sigedin.guest.responsable.Estado', 'Activo')
            ->get();
    }
}