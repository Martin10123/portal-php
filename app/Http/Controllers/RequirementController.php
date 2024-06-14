<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequerimentRequest;
use App\Models\FileRequest;
use App\Models\Requeriment;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class RequirementController extends Controller
{
    public function index()
    {
    }

    public function postRequeriment(RequerimentRequest $request)
    {
        $requeriment = Requeriment::create([
            'Caso' => $request->Caso,
            'Buque' => $request->Buque,
            'Proceso' => $request->Proceso,
            'ClienteExterno' => $request->ClienteExterno,
            'TipoBuque' => $request->TipoBuque,
            'Planta' => $request->Planta,
            'Solicitante' => $request->Solicitante,
            'CorreoSolicitante' => $request->CorreoSolicitante,
            'Interesado' => $request->Interesado,
            'CorreoInteresado' => $request->CorreoInteresado,
            'IdTipoServicio' => $request->IdTipoServicio,
            'Detalle' => $request->Detalle,
            'Titulo' => $request->Titulo,
            'FechaSolicitud' => $request->FechaSolicitud,
            'Asignado' => $request->Asignado,
            'FechaSolucion' => $request->FechaSolucion,
            'Estado' => $request->Estado,
            'OT' => $request->OT,
            'Armador' => $request->Armador,
            'CasaClasificadora' => $request->CasaClasificadora,
            'NumeroIMO' => $request->NumeroIMO,
            'Informador' => $request->Informador,
            'GerenteProyecto' => $request->GerenteProyecto,
        ]);

        $idReque = $requeriment->id;

        if ($request->hasFile('Files')) {
            $files = $request->file('Files');

            foreach ($files as $file) {
                $this->saveFiles($file, $idReque);
            }
        }

        return response()->json($requeriment);
    }

    public function saveFiles($file, $requerimentId)
    {
        try {
            $data = file_get_contents($file->getRealPath());

            $fileRequest = FileRequest::create([
                'RequerimientoID' => $requerimentId,
                'SoporteTipo' => "Adjunto",
                'SoporteEstado' => 1,
                'SoporteNombre' => $file->getClientOriginalName(),
                'Soporte' => FileRequest::convertirVarbinary($data),
                'SoporteExtension' => $file->getClientMimeType(),
                'SoporteFechaCreacion' => now(),
            ]);

            return response()->json($fileRequest);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    public function downloadFile($id)
    {
        $fileRequest = FileRequest::find($id);

        if (!$fileRequest) {
            return response()->json("File not found", 404);
        }

        $fileData = $fileRequest->Soporte;

        if (preg_match('/^0x[0-9a-fA-F]+$/', $fileData)) {
            $fileContent = hex2bin(substr($fileData, 2));
        } else {
            return response()->json([
                'message' => 'Invalid file data',
            ]);
        }

        $mimeType = $fileRequest->SoporteExtension;

        $response = Response::make($fileContent);
        $response->header('Content-Type', $mimeType);
        $response->header('Content-Disposition', 'attachment; filename="' . $fileRequest->SoporteNombre . '"');

        return $response;
    }
}