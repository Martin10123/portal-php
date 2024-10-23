<?php

namespace App\Http\Controllers;

use App\Models\Privilegios;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PrivilegiosController extends Controller
{
    public function index()
    {
        try {

            $userActive = Auth::user();

            $privilegios = Privilegios::with('menuItems')->where('Resp_ID', $userActive->IdResponsable)->get();

            return response()->json([
                'message' => 'Privilegios obtenidos correctamente',
                'data' => $privilegios,
                'ok' => true,
            ], 200);
        } catch (\Throwable $th) {
            Log::error("Error en PrivilegiosController@index: " . $th->getMessage());
            return response()->json([
                'message' => 'Error al obtener los privilegios' . $th->getMessage(),
                'ok' => false,
            ], 500);
        }
    }

    public function create()
    {
        return view('privilegios.create');
    }
}