<?php

namespace App\Http\Controllers;

use App\Imports\ExcelImportDB;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExcelFileController extends Controller
{
    public function loadExcelFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,csv',
        ]);

        $file = $request->file('file');
        Excel::import(new ExcelImportDB, $file);

        return response()->json([
            'message' => 'Archivo cargado correctamente',
            'success' => true,
        ]);
    }
}
