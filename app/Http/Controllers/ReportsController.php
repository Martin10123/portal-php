<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportsRequest;
use App\Models\Reports;
use App\Models\StagePersonnel;
use App\Models\SWBSPersonnel;

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

    public function getReport(ReportsRequest $report)
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
}