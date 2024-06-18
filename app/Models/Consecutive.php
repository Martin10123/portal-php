<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consecutive extends Model
{
    use HasFactory;

    protected $table = 'guest.consecutivos';

    protected $fillable = [
        'solicitud',
        'consecutivo'
    ];

    public $timestamps = false;
}