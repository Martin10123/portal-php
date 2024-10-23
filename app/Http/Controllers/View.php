<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class View extends Controller
{
    public function index() {}
}

// SELECT
//   planilla_reporte.Nombre,
//   planilla_reporte.Fecha,
//   planilla_reporte.Horas,
//   planilla_reporte.Fase,
//   planilla_reporte.SWBSPadre,
//   planilla_reporte.SWBS,
//   planilla_reporte.ITEM,
//   planilla_reporte.Act,
//   planilla_reporte.Tar,
//   planilla_reporte.SubTar,
//   CASE 
//     WHEN planilla_reporte.Tipo_Planilla = 1 THEN 'Horas Ordinarias'
//     WHEN planilla_reporte.Tipo_Planilla = 4 THEN 'Horas Extras'
//     ELSE 'Otro' -- En caso de que haya otros valores no especificados
//   END AS Tipo_Planilla,
//   planilla_reporte.Entregable,
//   planilla_reporte.División,
//   planilla_reporte.Proyecto,
//   planilla_reporte.Caso
// FROM
//   planilla_reporte
// WHERE
//   División IN (@Div)
//   AND planilla_reporte.Nombre IN (@Persona)  
//   AND planilla_reporte.Fecha BETWEEN @Fechaini AND @Fechafin