<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SWBSPersonnel extends Model
{
    use HasFactory;

    protected $table = 'guest.planilla_swbs';

    protected $fillable = [
        "swbs",
        "descripcion",
    ];
}