<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Responsable extends Model
{
    use HasFactory;

    protected $table = 'SIGEDIN.guest.Responsable';

    protected $primaryKey = 'idResponsable';
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'idResponsable',
        'Nombre',
        'Correo',
        'Cargo',
    ];
}