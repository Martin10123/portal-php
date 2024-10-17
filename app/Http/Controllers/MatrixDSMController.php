<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;

class MatrixDSMController extends Controller
{
    public function exportDataMatrix(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:xlsx,csv',
            ]);

            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                $file = $request->file('file');
                $fileName = $file->getClientOriginalName(); // Obtener el nombre original del archivo

                // Generar una clave única para el caché utilizando el nombre del archivo
                $cacheKey = 'excel_' . md5($fileName);

                // Verificar si los datos ya están en caché
                if (Cache::has($cacheKey)) {
                    // Si los datos ya están en caché, se devuelven directamente
                    $cachedData = Cache::get($cacheKey);

                    return response()->json([
                        'data' => $cachedData,
                        'message' => 'Archivo cargado desde la caché correctamente',
                        'ok' => true
                    ], 200);
                }

                // Si los datos no están en caché, procesar el archivo
                $spreadsheet = IOFactory::load($file->getPathname());
                $sheets = $spreadsheet->getAllSheets();
                $filteredData = [];

                foreach ($sheets as $sheet) {
                    $sheetName = $sheet->getTitle();
                    if (str_contains(strtoupper($sheetName), 'MOD')) {
                        $filteredData[$sheetName] = $sheet->toArray();
                    }
                }

                // Guardar los datos en la caché por 24 horas (1440 minutos)
                Cache::put($cacheKey, $filteredData, 1440);

                return response()->json([
                    'data' => $filteredData,
                    'message' => 'Archivo cargado correctamente',
                    'ok' => true
                ], 200);
            } else {
                Log::error('No se ha recibido un archivo válido');
                return response()->json([
                    'error' => 'No se ha recibido un archivo válido',
                    'message' => 'Por favor, sube un archivo válido.',
                    'ok' => false
                ], 400);
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return response()->json([
                'error' => $th->getMessage(),
                'message' => 'Error al cargar el archivo',
                'ok' => false
            ], 500);
        }
    }
}