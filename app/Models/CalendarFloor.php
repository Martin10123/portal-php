<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarFloor extends Model
{
    use HasFactory;

    protected $table = "Calendar_Salas";
    protected $primaryKey = 'ID';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        "ID",
        "Sala_Name",
        "Sala_Alias",
        "Sala_Color",
        "estado",
    ];

    public function respFloor()
    {
        return $this->hasMany(CalendarRespFloor::class, 'sala_id');
    }

    public function responsables()
    {
        return $this->hasManyThrough(
            Responsable::class,
            CalendarRespFloor::class,
            'sala_id',
            'idResponsable',
            'ID',
            'id_resp'
        );
    }
}