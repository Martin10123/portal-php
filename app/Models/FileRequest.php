<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileRequest extends Model
{
    use HasFactory;

    protected $table = 'guest.Req_Soporte';

    protected $fillable = [
        'RequerimientoID',
        'SoporteTipo',
        'SoporteEstado',
        'SoporteNombre',
        'Soporte',
        'SoporteExtension',
        'SoporteFechaCreacion',
    ];

    public $timestamps = false;
}