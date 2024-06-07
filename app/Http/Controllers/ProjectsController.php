<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Requerimiento;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\DB;

class ProjectsController extends Controller
{
    public function index()
    {
        $data = Requerimiento::select('caso', 'buque')->distinct()->orderBy('buque')->get();

        return response()->json($data);
    }

    public function getProjectSelect(ProjectRequest $request)
    {

        $dataResponse = Requerimiento::select('Planta', 'ClienteExterno', 'TipoBuque')
            ->where('Caso', $request->Caso)
            ->orderBy('Proceso', 'desc')
            ->first();

        $data = [
            'caso' => $request->Caso,
            'buque' => $request->Buque,
            'planta' => $dataResponse->Planta,
            'clienteExterno' => $dataResponse->ClienteExterno,
            'tipoBuque' => $dataResponse->TipoBuque
        ];

        return response()->json($data);
    }

    public function show()
    {
    }

    public function edit()
    {
        return view('projects.edit');
    }
}