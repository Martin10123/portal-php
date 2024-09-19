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

    public function user()
    {
        return $this->belongsTo(User::class, 'id_resp', 'id');
    }
}