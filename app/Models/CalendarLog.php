<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarLog extends Model
{
    use HasFactory;

    protected $table = 'Calendar_log';
    protected $primaryKey = 'ID';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'ID',
        'Calendar_ID',
        'Calendar_Estado',
        'Log_Test',
    ];

    public function calendar()
    {
        return $this->belongsTo(Calendar::class, 'Calendar_ID', 'ID');
    }
}