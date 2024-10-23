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
                $fileName = $file->getClientOriginalName();

                $cacheKey = 'excel_' . md5($fileName);

                if (Cache::has($cacheKey)) {
                    $cachedData = Cache::get($cacheKey);
                    $headerMatrix = $cachedData['headerMatrix'];
                    $bodyMatrix = $cachedData['bodyMatrix'];
                    $footerMatrix = $cachedData['footerMatrix'];

                    $this->calcIncidentsAndIncidentsNor($bodyMatrix);

                    return response()->json([
                        'data' => $cachedData['data'],
                        'headerMatrix' => $headerMatrix,
                        'bodyMatrix' => $bodyMatrix,
                        'footerMatrix' => $footerMatrix,
                        'message' => 'Archivo cargado desde la caché correctamente',
                        'ok' => true
                    ], 200);
                }

                $spreadsheet = IOFactory::load($file->getPathname());
                $sheets = $spreadsheet->getAllSheets();
                $filteredData = [];

                foreach ($sheets as $sheet) {
                    $sheetName = $sheet->getTitle();
                    $filteredData[$sheetName] = $sheet->toArray();
                }

                $headerMatrix = isset($filteredData['G100 mod']) ? array_slice($filteredData['G100 mod'], 0, 3) : [];

                $bodyMatrix = [];
                $footerMatrix = [];

                foreach ($filteredData['G100 mod'] as $row) {
                    if (!empty($row[0])) {
                        $bodyMatrix[] = $row;
                    }
                }

                foreach (array_slice($filteredData['G100 mod'], 3) as $index => $row) {
                    if (empty($row[0])) {
                        $footerMatrix[] = $row;
                    }
                }

                Cache::put($cacheKey, [
                    'data' => $filteredData,
                    'headerMatrix' => $headerMatrix,
                    'bodyMatrix' => $bodyMatrix,
                    'footerMatrix' => $footerMatrix
                ], 1440);

                $this->calcIncidentsAndIncidentsNor($bodyMatrix);

                return response()->json([
                    'data' => $filteredData,
                    'headerMatrix' => $headerMatrix,
                    'bodyMatrix' => $bodyMatrix,
                    'footerMatrix' => $footerMatrix,
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

    public function calcIncidentsAndIncidentsNor($bodyMatrix)
    {
        try {

            $numColumns = count($bodyMatrix);
            $sumIncident = array_fill(0, $numColumns, 0);
            $restIncidentNorm = array_fill(0, $numColumns, 0);

            for ($i = 0; $i < $numColumns; $i++) {
                for ($j = 6; $j < $numColumns; $j++) {
                    if (!isset($bodyMatrix[$i][$j])) {
                        continue;
                    }

                    $sumIncident[$j - 6] += (int) ($bodyMatrix[$i][$j]);
                }
            }

            $totalIncidents = 0;

            for ($i = 0; $i < $numColumns; $i++) {
                $totalIncidents += $sumIncident[$i];
            }

            for ($i = 0; $i < $numColumns; $i++) {

                if ($sumIncident[$i] === 0) {
                    continue;
                }

                $restIncidentNorm[$i] = $sumIncident[$i] / $totalIncidents;
            }

            return [
                'incNorm' => $restIncidentNorm,
                'sumIncident' => $sumIncident,
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }
}
