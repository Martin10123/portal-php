<?php

namespace App\Http\Controllers;

use App\Models\Requerimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectsController extends Controller
{
    public function index(Request $request)
    {
        $data = Requerimiento::select('caso', 'buque')->distinct()->orderBy('buque')->get();

        return response()->json($data);
    }

    public function getProjectSelect(Request $request)
    {
        // $requriment = Requerimiento::where('caso', $request->caso)->get();

        dd($request);
        // dd($requriment);
    }

    public function create()
    {
        return view('projects.create');
    }

    public function edit()
    {
        return view('projects.edit');
    }
}