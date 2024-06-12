<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Requerimiento;

class ProjectsController extends Controller
{
    public function index()
    {
        $data = Requerimiento::select('caso', 'buque')->distinct()->orderBy('buque')->get();
        $Dataplanta = Requerimiento::select('Planta')->distinct()->orderBy('planta', 'asc')->get();;

        $result = $data->map(function ($item) {
            return [
                'caso' => $item->caso,
                'buque' => $item->buque,
                'buqueCaso' => $item->caso . ' - ' . $item->buque
            ];
        });

        return response()->json(
            [
                'projects' => $result,
                'dataPlanta' => $Dataplanta
            ]
        );
    }

    public function getProjectSelect(ProjectRequest $request)
    {
        $dataResponse = Requerimiento::select('Planta', 'ClienteExterno', 'TipoBuque', 'Proceso')
            ->where('Caso', $request->Caso)
            ->orderBy('Proceso', 'desc')
            ->first();

        $data = [
            'caso' => $request->Caso,
            'buque' => $request->Buque,
            'planta' => $dataResponse->Planta,
            'clienteExterno' => $dataResponse->ClienteExterno,
            'tipoBuque' => $dataResponse->TipoBuque,
            'proceso' => $dataResponse->Proceso
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