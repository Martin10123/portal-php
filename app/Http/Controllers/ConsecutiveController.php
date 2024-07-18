<?php

namespace App\Http\Controllers;

use App\Models\Consecutive;
use Illuminate\Http\Request;

class ConsecutiveController extends Controller
{
    public function index(Request $request)
    {
        $data = Consecutive::select('solicitud', 'consecutivo')
            ->where('solicitud', $request->solicitud)
            ->get();

        return response()->json($data);
    }
}