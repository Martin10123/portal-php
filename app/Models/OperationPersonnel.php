<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperationPersonnel extends Model
{
    use HasFactory;

    protected $table = 'guest.planilla_operacion';

    protected $fillable = [
        'detalle',
    ];
}