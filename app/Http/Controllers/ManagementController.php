<?php

namespace App\Http\Controllers;

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
            $division = DB::table('sigedin.guest.Division')
                ->select('DivisionID', 'DivisionName')
                ->get();

            return response()->json([
                'data' => $division,
                'message' => 'Divisiones obtenidas correctamente',
                'ok' => true,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'ok' => false,
            ]);
        }
    }
}