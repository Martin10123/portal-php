<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonnelRequest;
use App\Imports\ExcelImportDB;
use App\Models\Activities;
use App\Models\OperationPersonnel;
use App\Models\Reports;
use App\Models\StagePersonnel;
use App\Models\SWBSPersonnel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class PersonnelController extends Controller
{
    public function index()
    {
        try {
            $reports = Reports::select("Proyecto")
                ->distinct()
                ->where('Estado', 'Activo')->get();

            return response()->json($reports);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function searchReport(Request $report)
    {
        try {
            $reportFound = Reports::where('Proyecto', $report->Proyecto)
                ->where('Estado', 'Activo')
                ->get();

            return response()->json($reportFound);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function getStagePersonnel()
    {
        try {
            $stagePersonnel = StagePersonnel::select("fase")
                ->distinct()
                ->get();

            return response()->json($stagePersonnel);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function getSWBSPersonnel()
    {
        try {
            $swbsPersonnel = SWBSPersonnel::select("swbs")
                ->distinct()
                ->get();

            return response()->json($swbsPersonnel);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function getOperationPersonnel()
    {
        try {
            $operationPersonnel = OperationPersonnel::select("detalle")
                ->distinct()
                ->get();

            return response()->json($operationPersonnel);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function getActivities()
    {
        try {

            $activities = Activities::all()
                ->where("Estado", "1");

            return response()->json([
                "data" => $activities,
                "message" => "Actividades obtenidas correctamente",
                "ok" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                $th,
                "message" => "Ocurrió un error al obtener las actividades",
                "ok" => false
            ]);
        }
    }

    public function updateGraph(PersonnelRequest $request)
    {
        try {
            $report = Reports::find($request->id);

            if (!$report) {
                return response()->json(['message' => 'Reporte no encontrado'], 404);
            }

            $data = [
                'Grafo_OP' => $request->graph ?? $report->Grafo_OP,
                'Fase' => $request->stage ?? $report->Fase,
                'SWBS' => $request->swbs ?? $report->SWBS,
                'Operación_Proceso' => $request->operation ?? $report->Operación_Proceso,
                'Estado' => $request->state ?? $report->Estado,
                'Bloque' => $request->block ?? $report->Bloque,
            ];

            $report->update($data);

            return response()->json($report);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al actualizar el reporte',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function updateMassaGraphs(PersonnelRequest $request)
    {
        try {

            $allReports = $request->reports;
            $allReportsUpdated = [];

            foreach ($allReports as $report) {
                $reportFound = Reports::find($report['Id']);

                if (!$reportFound) {
                    return response()->json(['message' => 'Reporte no encontrado'], 404);
                }

                $data = [
                    'Fase' => $request->stage ?? $reportFound->Fase,
                    'SWBS' => $request->swbs ?? $reportFound->SWBS,
                    'Operación_Proceso' => $request->operation ?? $reportFound->Operación_Proceso,
                    'Estado' => $request->state ?? $reportFound->Estado,
                    'Bloque' => $request->block ?? $reportFound->Bloque,
                    "Proyecto" => $request->Proyecto ?? $reportFound->Proyecto,
                    "Caso" => $request->Caso ?? $reportFound->Caso,
                    "Codigo_SAP" => $request->Codigo_SAP ?? $reportFound->Codigo_SAP
                ];

                $reportFound->update($data);

                array_push($allReportsUpdated, $reportFound);
            }

            return response()->json($allReportsUpdated);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function loadExcelFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,csv',
        ]);

        $excelBD = new ExcelImportDB();

        $file = $request->file('file');
        Excel::import($excelBD, $file);

        return response()->json([
            'message' => 'Archivo cargado correctamente',
            'success' => true,
            'rowCount' => $excelBD->getRowCount(),
            'rowsNotImported' => $excelBD->getRowsNotImported(),
        ]);
    }

    public function addGraph(Request $request)
    {
        try {

            $excelBD = new ExcelImportDB();
            $allGraphs = $request->reports;
            $allGraphsUpdated = [];
            $graphNotSaved = 0;

            foreach ($allGraphs as $graph) {

                $graph['bloque'] = $graph['bloque'] === "-" ? "" : $graph['bloque'];
                $exists = $excelBD->existsGraph($graph, true);

                if (!$exists) {

                    $idActivitie = null;
                    $activitieSelect = Activities::where('Actividad', $graph['operacion_proceso'])->first();

                    // Valida que la actividad exista, si no la crea
                    if ($activitieSelect) {
                        $idActivitie = $activitieSelect->Id;
                    } else {
                        $activitie = Activities::create([
                            'Actividad' => $graph['operacion_proceso'],
                            'Estado' => 1
                        ]);

                        $idActivitie = $activitie->Id;
                    }

                    $report = Reports::create([
                        'Grafo_OP' => $graph['grafo_op'],
                        'Fase' => $graph['fase'],
                        'SWBS' => $graph['swbs'],
                        'Operación_Proceso' => $graph['operacion_proceso'],
                        'Estado' => $graph['estado'],
                        'Bloque' => $graph['bloque'],
                        "Proyecto" => $graph['proyecto'],
                        "Id_Actividad" => $idActivitie,
                        "Caso" => $graph['caso'],
                        "Codigo_SAP" => $graph['codigo_sap'],
                    ]);

                    array_push($allGraphsUpdated, $report);
                } else {
                    $graphNotSaved++;
                    Log::info("El grafo ya existe");
                }
            }

            return response()->json([
                'message' => 'Reportes agregados correctamente',
                'success' => true,
                'graphNotSaved' => $graphNotSaved,
                'allGraphsUpdated' => $allGraphsUpdated
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al agregar el reporte',
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
}