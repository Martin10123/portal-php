<?php

use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TipoServicioController;
use App\Http\Controllers\UserController;
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

    Route::get('/users', [UserController::class, 'index'])->name('get.users');

    Route::get('/tipoServicios', [TipoServicioController::class, 'index'])->name('get.tipoServicios');

    Route::post('/getTipoServicio', [TipoServicioController::class, 'getServicioSolicitado'])->name('post.getTipoServicio');

    Route::get("/projects", [ProjectsController::class, "index"])->name('get.projects');

    Route::post("/getProject", [ProjectsController::class, "getProjectSelect"])->name('post.project.select');

    Route::get('Sigedin/Request/AddRequest', function () {
        return Inertia::render('Request/AddRequest');
    })->name('AddRequest');

    Route::get('Sigedin/Request/ApproveRequest', function () {
        return Inertia::render('Request/ApproveRequest');
    })->name('ApproveRequest');

    Route::get('Sigedin/Profile/Profile', function () {
        return Inertia::render('Profile/Profile');
    })->name('Profile');
});