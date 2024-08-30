<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activities extends Model
{
    use HasFactory;

    protected $table = "guest.Planilla_Actividades";

    protected $primaryKey = 'Id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        "Id",
        "Actividad",
        "Estado",
    ];
}
