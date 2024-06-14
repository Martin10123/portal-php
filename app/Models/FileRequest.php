<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class FileRequest extends Model
{
    use HasFactory;

    protected $table = 'guest.Req_Soporte';

    protected $primaryKey = 'SoporteID';

    protected $fillable = [
        'RequerimientoID',
        'SoporteTipo',
        'SoporteEstado',
        'SoporteNombre',
        'Soporte',
        'SoporteExtension',
        'SoporteFechaCreacion',
    ];

    public $timestamps = false;

    public static function convertirVarbinary($cadena)
    {
        return DB::raw("0x" . bin2hex($cadena));
    }
}