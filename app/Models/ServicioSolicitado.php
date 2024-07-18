<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicioSolicitado extends Model
{
    use HasFactory;

    protected $table = 'guest.TipoServicio';

    protected $fillable = [
        'IdTipo',
        'NombreTipo',
        'IdResponsable',
        'idTservicio',
        'IdResponsable2',
        'trespuesta',
        'preAsignado',
        'suplente',
        'isfinallizable',
    ];
}