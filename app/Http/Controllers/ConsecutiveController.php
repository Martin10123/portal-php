<?php

namespace App\Http\Controllers;

use App\Models\Consecutive;
use Illuminate\Http\Request;

class ConsecutiveController extends Controller
{
    public function index(Request $request)
    {
        try {
            $data = Consecutive::select('solicitud', 'consecutivo')
                ->where('solicitud', $request->solicitud)
                ->get();

            return response()->json($data);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }
    }
}