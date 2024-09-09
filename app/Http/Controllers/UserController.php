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

    public function consultaUsuariosXGerencia($gerencia)
    {
        try {
            $usuarios = $this->consultaABD($gerencia);

            return response()->json([
                'usuarios' => $usuarios,
                'gerencia' => $gerencia,
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

    public function consultaCasoBuqueDePersonaSeleccionada($idResponsable)
    {
        try {
            $datosDeXUsuarioCasoBuque = PlanillaReporte::where('Trabajador', $idResponsable)
                ->distinct('Caso')
                ->select('Caso', 'Proyecto')
                ->get();

            return response()->json([
                'datos' => $datosDeXUsuarioCasoBuque,
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener caso según persona: ' . $th->getMessage());
            return response()->json([
                'error' => 'Error al obtener caso según persona.',
                'message' => $th->getMessage(),
                'ok' => false
            ], 500);
        }
    }

    public function consultaDatosSegunPersonaSeleccionada(Request $request)
    {
        try {

            $horasAcumuladas = 0;
            $semanasData = [];
            $concurrenciaFase = [];

            $fechaCarbon = $request->fecha ? Carbon::parse($request->fecha) : null;
            $month_end = $fechaCarbon ? $fechaCarbon->endOfMonth() : null;

            $datosDeXUsuarios = PlanillaReporte::whereIn('Trabajador', $request->personas);

            if ($fechaCarbon) {
                $datosDeXUsuarios = $datosDeXUsuarios->whereDate('Fecha', '>=', $request->fecha)
                    ->whereDate('Fecha', '<=', $month_end);
            }

            $datosDeXUsuarios = $datosDeXUsuarios->orderBy('Fecha', 'asc')
                ->chunk(1000, function ($datosDeXUsuarios) use (&$semanasData, &$horasAcumuladas, &$concurrenciaFase) {
                    foreach ($datosDeXUsuarios as $dato) {
                        // Procesamiento de las semanas
                        $fecha = Carbon::parse($dato->Fecha);
                        $isoWeek = $fecha->isoWeek();
                        $weekYear = $fecha->year;

                        if (!isset($semanasData[$isoWeek])) {
                            $semanasData[$isoWeek] = [
                                'horasSemanales' => 0,
                                'horasAcumuladas' => 0,
                                'detalles' => []
                            ];
                        }

                        $horas = (float) $dato->Horas;
                        $semanasData[$isoWeek]['horasSemanales'] += $horas;
                        $horasAcumuladas += $horas;
                        $semanasData[$isoWeek]['horasAcumuladas'] = $horasAcumuladas;
                        $semanasData[$isoWeek]['detalles'][] = ["w{$isoWeek}-{$weekYear}", $semanasData[$isoWeek]['horasSemanales'], $horasAcumuladas, '22'];

                        // Cálculo de la concurrencia por fase
                        if (!isset($concurrenciaFase[$dato->Fase])) {
                            $concurrenciaFase[$dato->Fase] = 1;
                        } else {
                            $concurrenciaFase[$dato->Fase] += 1;
                        }
                    }
                });

            return response()->json([
                'semanasData' => $semanasData,
                'concurrenciaFase' => $concurrenciaFase,
                'ok' => true
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
