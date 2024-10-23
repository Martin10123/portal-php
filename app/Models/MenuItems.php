<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItems extends Model
{
    use HasFactory;

    protected $table = 'Menu_Items';
    protected $primaryKey = 'Menu_ID';
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = ['Menu_ID', 'Menu_Item'];
}
