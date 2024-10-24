<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarRespFloor extends Model
{
    use HasFactory;

    protected $table = "Calendar_Resp_Sala";
    protected $primaryKey = 'ID';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        "ID",
        "sala_id",
        "id_resp",
        "estado",
    ];

    public function responsable()
    {
        return $this->belongsTo(Responsable::class, 'id_resp', 'idResponsable');
    }

    public function scopeActive($query)
    {
        return $query->where('estado', '1');
    }
}