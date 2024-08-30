<?php

namespace App\Http\Controllers;

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

    public function getGerencia() {}
}
