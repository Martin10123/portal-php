<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ManagementController extends Controller
{
    public function index()
    {
        try {
            $management = DB::table('sigedin.guest.Gerencias')
                ->select('Nombre')
                ->where('Estado', 1)
                ->get();

            return response()->json($management);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }

    public function getDivision()
    {
        try {

            $usuarioActivo = Auth::user();

            $divisiones = DB::table('sigedin.guest.division')
                ->select('DivisionID', 'DivisionName');

            if ($usuarioActivo->IsJefe == "1" || $usuarioActivo->IdResponsable == "20258") {
                $divisiones->where('DivisionID', $usuarioActivo->IdDivision);
            }

            $divisiones = $divisiones->get();

            return response()->json([
                'data' => $divisiones,
                'message' => 'Divisiones obtenidas correctamente',
                'ok' => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'message' => $th->getMessage(),
                    'ok' => false,
                ]
            );
        }
    }
}