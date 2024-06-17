<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReqAsignado extends Model
{
    use HasFactory;

    protected $table = 'guest.Req_Asignado';

    protected $primaryKey = 'ID';
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'RequerimientoID',
        'ResponsableID',
        'Estado',
        'Fecha',
    ];

    public $timestamps = false;
}