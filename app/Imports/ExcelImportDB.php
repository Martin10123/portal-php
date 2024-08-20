<?php

namespace App\Imports;

use App\Models\Reports;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ExcelImportDB implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Reports([
            'Grafo_OP' => $row['grafo_op'],
            'Proyecto' => $row['proyecto'],
            'Codigo_SAP' => $row['codigo_sap'],
            'Fase' => $row['fase'],
            'SWBS' => $row['swbs'],
            'Operación_Proceso' => $row['operacion_proceso'],
            'Id_Actividad' => $row['id_actividad'],
            'Estado' => $row['estado'],
            'Bloque' => $row['bloque'],
            'Caso' => $row['caso'],
        ]);
    }
}
