<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requeriment extends Model
{
    use HasFactory;

    protected $table = "guest.RequerimientosTest";

    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'Caso',
        'Buque',
        'Proceso',
        'ClienteExterno',
        'TipoBuque',
        'Planta',
        'Solicitante',
        'CorreoSolicitante',
        'Interesado',
        'CorreoInteresado',
        'IdTipoServicio',
        'Detalle',
        'Titulo',
        'FechaSolicitud',
        'tituloReq',
        'usuarioIngreso',
        'Consecutivo',
        'FechaSolucion',
        'Estado',
        'OT',
        'Armador',
        'CasaClasificadora',
        'NumeroIMO',
        'Informador',
        'GerenteProyecto',
    ];

    public $timestamps = false;
}