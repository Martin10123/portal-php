<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers() {
        $pathGetUsers = "SELECT TOP 1 FROM SIGEDIN.GUEST.Responsables";
    }
}