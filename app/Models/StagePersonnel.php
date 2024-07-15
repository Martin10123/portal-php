<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StagePersonnel extends Model
{
    use HasFactory;

    protected $table = 'guest.planilla_fase';

    protected $fillable = [
        "fase"
    ];
}