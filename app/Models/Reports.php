<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{
    use HasFactory;

    protected $table = 'guest.planilla_grafos2';

    protected $primaryKey = 'Id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'Id',
        'Grafo_OP',
        'Proyecto',
        'Codigo_SAP',
        'Fase',
        'SWBS',
        'Operación_Proceso',
        'Id_Actividad',
        'Estado',
        'Bloque',
        'Caso',
    ];
}