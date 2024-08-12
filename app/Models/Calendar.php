<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;

    protected $table = 'dbo.Calendar';

    protected $primaryKey = 'ID';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'ID',
        'title',
        'description',
        'starting_date',
        'ending_date',
        'participants_necesary',
        'participants_optional',
        'resource',
        'backgroundColor',
        'division',
        'isVRRequired',
        'type_service_ID',
        'uid_user',
        'calendar_status',
    ];

    public function typeServices()
    {
        return $this->belongsTo(TypeServices::class, 'type_service_ID');
    }

}