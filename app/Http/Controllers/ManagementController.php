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
}
