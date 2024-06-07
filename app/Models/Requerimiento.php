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
}