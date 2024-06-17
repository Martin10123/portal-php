<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequerimentRequest;
use App\Models\FileRequest;
use App\Models\ReqAsignado;
use App\Models\Requeriment;
use App\Models\ServicioSolicitado;
use Exception;
use Illuminate\Support\Facades\Log;

class RequirementController extends Controller
{
    public function index()
    {
    }

    public function postRequeriment(RequerimentRequest $request)
    {
        try {
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
                'usuarioIngreso' => $request->UsuarioIngreso,
                'FechaSolucion' => $request->FechaSolucion,
                'Estado' => $request->Estado,
                'OT' => $request->OT,
                'Armador' => $request->Armador,
                'CasaClasificadora' => $request->CasaClasificadora,
                'NumeroIMO' => $request->NumeroIMO,
                'Informador' => $request->Informador,
                'GerenteProyecto' => $request->GerenteProyecto,
            ]);

            $this->saveReqAsignado($requeriment->id, $request->IdTipoServicio);

            $idReque = $requeriment->id;

            if (collect($request->Files)->count() > 0) {
                $files = $request->file('Files');

                foreach ($files as $file) {
                    $this->saveFiles($file, $idReque);
                }
            }

            return response()->json([
                $requeriment, 'message' => 'Requerimiento creado correctamente'
            ]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
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

            return response()->json([$fileRequest, 'message' => 'Archivo creado correctamente']);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    public function getPreAsignadoTipoServicio($idTipoServicio)
    {
        try {
            $preAsignado = ServicioSolicitado::select('pre_asignado')
                ->where('ID', $idTipoServicio)
                ->first();

            return $preAsignado->pre_asignado;
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }

    public function saveReqAsignado($idRequerimiento, $idTipoServicio)
    {
        try {
            $preAsignadoNum = $this->getPreAsignadoTipoServicio($idTipoServicio);

            $reqAsignado = ReqAsignado::create([
                'RequerimientoID' => $idRequerimiento,
                'ResponsableID' =>  $preAsignadoNum,
                'Estado' => 'Asignado',
                'Fecha' => now(),
            ]);

            return response()->json([$reqAsignado, 'message' => 'Requerimiento asignado correctamente']);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }
}