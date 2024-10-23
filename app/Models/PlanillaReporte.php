<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanillaReporte extends Model
{
    use HasFactory;

    protected $table = 'guest.View_INFORME_DEPPD_01';

    public $timestamps = false;

    protected $fillable = [
        'Nombre',
        'Fecha',
        'Horas',
        'Fase',
        'SWBSPadre',
        'SWBS',
        'ITEM',
        'Act',
        'Tar',
        'SubTar',
        'Tipo_Planilla',
        'Entregable',
        'División',
        'Proyecto',
        'Caso',
        'Trabajador',
    ];
}
