<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportsRequest;
use App\Models\OperationPersonnel;
use App\Models\Reports;
use App\Models\StagePersonnel;
use App\Models\SWBSPersonnel;
use Illuminate\Http\Request;

class ReportsController extends Controller
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

    public function updateGraph(ReportsRequest $request)
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


    public function updateMassaGraphs(ReportsRequest $request)
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
}