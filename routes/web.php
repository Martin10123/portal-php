<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('Sigedin', function () {
        return Inertia::render('Sigedin');
    })->name('Sigedin');

    Route::get('Sigedin/Request/AddRequest', function () {
        return Inertia::render('Request/AddRequest');
    })->name('AddRequest');

    Route::get('Sigedin/Request/ApproveRequest', function () {
        return Inertia::render('Request/ApproveRequest');
    })->name('ApproveRequest');
});