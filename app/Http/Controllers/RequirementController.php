<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequerimentRequest;
use App\Models\Consecutive;
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
            // Crea el requerimiento en la base de datos y obtiene el id del requerimiento creado
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
                'tituloReq' => $request->TituloReq,
                'Titulo' => $request->Titulo,
                'FechaSolicitud' => $request->FechaSolicitud,
                'usuarioIngreso' => $request->UsuarioIngreso,
                'Consecutivo' => $request->Consecutivo,
                'FechaSolucion' => $request->FechaSolucion,
                'Estado' => $request->Estado,
                'OT' => $request->OT,
                'Armador' => $request->Armador,
                'CasaClasificadora' => $request->CasaClasificadora,
                'NumeroIMO' => $request->NumeroIMO,
                'Informador' => $request->Informador,
                'GerenteProyecto' => $request->GerenteProyecto,
            ]);

            // Obtiene el id del requerimiento creado
            $idReque = $requeriment->id;

            // Guarda en la tabla ReqAsignado el requerimiento asignado con su respectivo responsable asignado
            $responseReqAsi = $this->saveReqAsignado($idReque, $request->IdTipoServicio);

            // Actualiza el consecutivo de acuerdo al tipo de usuario y al titulo del requerimiento
            $responseConsecutive = $this->changeConsecutives($request->TipoUsuario, $request->TituloReq);

            $responseFiles = null;

            // // Guarda los archivos adjuntos del requerimiento
            if (collect($request->Files)->count() > 0) {
                $files = $request->file('Files');

                foreach ($files as $file) {
                    $responseFiles = $this->saveFiles($file, $idReque);
                }
            }

            return response()->json([
                'requeriment' => $requeriment,
                'message' => 'Requerimiento creado correctamente',
                'ReqAsignado' => $responseReqAsi,
                'Files' => $responseFiles,
                'Consecutivo' => $responseConsecutive,
            ]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }

    public function getPreAsignadoTipoServicio($idTipoServicio)
    {
        try {
            $preAsignado = ServicioSolicitado::select('pre_asignado')
                ->where('id_tservicio', (int) $idTipoServicio)
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

            return response()->json([$reqAsignado->all(), 'message' => 'Requerimiento asignado correctamente']);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }

    public function changeConsecutives($tipoUsuario, $tituloReq)
    {
        try {

            $responseOperativo = null;
            $responseEstimacion = null;

            if ($tipoUsuario == 'Operativo') {
                $consecutivo = Consecutive::where('id', 2)
                    ->first();

                $sumOneToConsecutive = (int) ($consecutivo->consecutivo) + 1;
                $consecutivo->consecutivo = (string) $sumOneToConsecutive;
                $consecutivo->save();

                $responseOperativo = ([
                    'message operativo' => 'Consecutivo actualizado correctamente',
                    'consecutivo' => $consecutivo
                ]);
            }

            if ($this->compareStrings($tituloReq, 'estimacion')) {
                
                $consecutivo = Consecutive::where('solicitud', 'Estimaciones')
                    ->first();

                if ((int) substr($consecutivo->consecutivo, 4, 6)) {
                    
                } else {
                    $getTheFourFirstNumber = (int) substr($consecutivo->consecutivo, 0, 4) + 1;

                    if ($getTheFourFirstNumber < 100) {
                        $getTheFourFirstNumber = '00' . $getTheFourFirstNumber; 
                    } else if ($getTheFourFirstNumber < 1000) {
                        $getTheFourFirstNumber = '0' . $getTheFourFirstNumber;
                    }
    
                    $consecutivo->consecutivo = (string) $getTheFourFirstNumber . substr($consecutivo->consecutivo, 4);
                    $consecutivo->save();
    
                    $responseEstimacion = ([
                        'message estimación' => 'Consecutivo actualizado correctamente',
                        'sumOneToConsecutive' => $consecutivo,
                    ]);
                }
                
            }

            return response()->json([$responseOperativo, $responseEstimacion]);
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

            return response()->json([$fileRequest->all(), 'message' => 'Archivo creado correctamente']);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    public function removeAccents($string)
    {
        $unwanted_array = [
            'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a',
            'ç' => 'c',
            'è' => 'e', 'é' => 'e', 'ê' => 'e', 'ë' => 'e',
            'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i',
            'ñ' => 'n',
            'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'õ' => 'o', 'ö' => 'o',
            'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ü' => 'u',
            'ý' => 'y', 'ÿ' => 'y',
            'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A',
            'Ç' => 'C',
            'È' => 'E', 'É' => 'E', 'Ê' => 'E', 'Ë' => 'E',
            'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I',
            'Ñ' => 'N',
            'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O', 'Õ' => 'O', 'Ö' => 'O',
            'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U',
            'Ý' => 'Y'
        ];

        return strtr(mb_convert_encoding($string, 'UTF-8', 'UTF-8'), $unwanted_array);
    }

    public function compareStrings($str1, $str2)
    {
        $str1 = strtolower($this->removeAccents($str1));
        $str2 = strtolower($this->removeAccents($str2));

        return str_contains($str1, $str2);
    }
}