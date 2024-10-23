<?php

namespace App\Imports;

use App\Models\Reports;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ExcelImportDB implements ToModel, WithHeadingRow, WithChunkReading
{

    protected $rowsCorrects = 0;
    protected $rowsNotImported = [];

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        try {

            $exists = $this->existsGraph($row);

            if ($exists) {
                $this->rowsNotImported[] = $row;
                return null;
            }

            $this->rowsCorrects++;

            return new Reports([
                'Grafo_OP' => trim($row['grafo_op']),
                'Proyecto' => trim($row['proyecto']),
                'Codigo_SAP' => trim($row['codigo_sap']),
                'Fase' => trim($row['fase']),
                'SWBS' => trim($row['swbs']),
                'Operación_Proceso' => trim($row['operacion_proceso']),
                'Id_Actividad' => trim($row['id_actividad']),
                'Estado' => trim($row['estado']),
                'Bloque' => trim($row['bloque'] ?? ""),
                'Caso' => trim($row['caso']),
            ]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }

    public function existsGraph($row, $ignoreIdActividad = false)
    {
        $query = Reports::where("Grafo_OP", $row['grafo_op'])
            ->where('Proyecto', $row['proyecto'])
            ->where('Codigo_SAP', $row['codigo_sap'])
            ->where('Fase', $row['fase'])
            ->where('SWBS', $row['swbs'])
            ->where('Operación_Proceso', $row['operacion_proceso'])
            ->where('Estado', $row['estado'])
            ->where('Bloque', $row['bloque'] ?? "")
            ->where('Caso', $row['caso']);

        if (!$ignoreIdActividad) {
            $query->where('Id_Actividad', $row['id_actividad']);
        }

        return $query->exists();
    }

    public function getRowCount(): int
    {
        return $this->rowsCorrects;
    }

    public function getRowsNotImported(): array
    {
        return $this->rowsNotImported;
    }

    public function chunkSize(): int
    {
        return 1000;
    }
}