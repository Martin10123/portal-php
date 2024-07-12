<?php

namespace App\Http\Controllers;

use App\Models\Reports;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function index()
    {
        $reports = Reports::select("*")
            ->distinct("Proyecto")
            ->where('Estado', '==', 'Activo')->get();
        return view('reports.index', compact('reports'));
    }
}