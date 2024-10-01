<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privilegios extends Model
{
    use HasFactory;

    protected $table = 'Privilegios';
    protected $primaryKey = 'Privilegio_ID';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable = ['Privilegio_ID', 'Resp_ID', 'Menu_Items_ID', 'Is_Visible', 'Is_Jefe', 'Is_Admin'];

    public function menuItems()
    {
        return $this->belongsTo(MenuItems::class, 'Menu_Items_ID', 'Menu_ID');
    }
}
