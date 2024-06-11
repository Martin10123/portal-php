<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServicioSolicitadoRequest;
use App\Models\ServicioSolicitado;
use App\Models\TipoServicio;

class TipoServicioController extends Controller
{
    public function index()
    {
        $tiposervicios = TipoServicio::all();

        return response()->json($tiposervicios);
    }

    public function getServicioSolicitado(ServicioSolicitadoRequest $request)
    {
        $dataResponse = ServicioSolicitado::select('id_tservicio', 'NombreTipo', 'IdResponsable', 'trespuesta', 'isfinallizable')
            ->where('id_tservicio', $request->idTservicio)
            ->get();

        return response()->json($dataResponse);
    }
}