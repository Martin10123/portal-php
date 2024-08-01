<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeServices extends Model
{
    use HasFactory;

    protected $table = 'type_services';
    protected $primaryKey = 'type_service_ID';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'type_service_ID',
        'description',
        'services_status',
    ];
}