<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requerimiento extends Model
{
    use HasFactory;

    protected $table = "guest.Requerimientos";

    protected $fillable = [
        'caso',
        'buque',
        'clienteExterno',
        'tipoBuque',
        'Planta',
    ];


    // protected $appends = [
    //     'Consecutivo',
    //     'Solicitante',
    //     'IdTipoServicio',
    //     'Detalle',
    //     'Titulo',
    //     'FechaSolicitud',
    //     'CorreoSolicitante',
    //     'Interesado',
    //     'CorreoInteresado',
    //     'Archivo',
    //     'Asignado',
    //     'ArchivoSolicitud',
    //     'TipoBuque',
    //     'FechaSolucion',
    //     'Estado',
    //     'FechaAsignacion',
    //     'FechaEstimacion',
    //     'NumItems',
    //     'MontoEstimacion',
    //     'MonedaEstimacion',
    //     'TrmEstimacion',
    //     'TipoAprobacion',
    //     'ItemsAprobados',
    //     'FechaAprobacion',
    //     'OT',
    //     'Monto',
    //     'ArchivoAprobacion',
    //     'ArchivoCierre',
    //     'FechaCierre',
    //     'CierreAuto',
    //     'ObservacionCierre',
    //     'ClienteExterno',
    //     'Armador',
    //     'CasaClasificadora',
    //     'NumeroIMO',
    //     'Informador',
    //     'GerenteProyecto',
    //     'FechaEntregaInicial',
    //     'prioridad',
    //     'dificultad',
    //     'usuarioIngreso',
    //     'ObsIngreso',
    //     'onReport',
    //     'tituloReq'
    // ];
}