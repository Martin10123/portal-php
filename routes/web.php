<?php

use App\Http\Controllers\ProjectsController;
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

    Route::post("/project-selected", [ProjectsController::class, "getProjectSelect"])->name('get.project.select');

    Route::get("/projects", [ProjectsController::class, "index"])->name('get.projects');

    Route::get('Sigedin/Request/AddRequest', function () {
        return Inertia::render('Request/AddRequest');
    })->name('AddRequest');

    Route::get('/', function () {
        return Inertia::render('');
    })->name('Request');

    Route::get('Sigedin/Request/ApproveRequest', function () {
        return Inertia::render('Request/ApproveRequest');
    })->name('ApproveRequest');

    Route::get('Sigedin/Profile/Profile', function () {
        return Inertia::render('Profile/Profile');
    })->name('Profile');
});