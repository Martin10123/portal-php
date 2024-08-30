<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\ConsecutiveController;
use App\Http\Controllers\ManagementController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\TipoServicioController;
use App\Http\Controllers\TypeServicesCalendarController;
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

    // Usuarios
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/getGerencia', [UserController::class, 'getGerencia'])->name('getGerencia');
    });

    // Servicios
    Route::prefix('tipoServicios')->name('tipoServicios.')->group(function () {
        Route::get('/', [TipoServicioController::class, 'index'])->name('index');
        Route::post('/get', [TipoServicioController::class, 'getServicioSolicitado'])->name('get');
    });

    // Consecutivos
    Route::prefix('consecutives')->name('consecutives.')->group(function () {
        Route::get('/{solicitud}', [ConsecutiveController::class, 'index'])->name('index');
    });

    // Proyectos
    Route::prefix('projects')->name('projects.')->group(function () {
        Route::get('/', [ProjectsController::class, 'index'])->name('index');
        Route::post('/select', [ProjectsController::class, 'getProjectSelect'])->name('select');
    });

    // Requerimientos
    Route::prefix('requirements')->name('requirements.')->group(function () {
        Route::post('/', [RequirementController::class, 'postRequeriment'])->name('post');
    });

    // Reportes
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/', [PersonnelController::class, 'index'])->name('index');
        Route::post('/searchReport', [PersonnelController::class, 'searchReport'])->name('searchReport');
        Route::get('/stagePersonnel', [PersonnelController::class, 'getStagePersonnel'])->name('stagePersonnel');
        Route::get('/swbsPersonnel', [PersonnelController::class, 'getSWBSPersonnel'])->name('swbsPersonnel');
        Route::get('/operationsPersonnel', [PersonnelController::class, 'getOperationPersonnel'])->name('operationsPersonnel');
        Route::post('/updateGraph', [PersonnelController::class, 'updateGraph'])->name('updateGraph');
        Route::post('/updateMassaGraphs', [PersonnelController::class, 'updateMassaGraphs'])->name('updateMassaGraphs');
        Route::post('/importExcel', [PersonnelController::class, 'loadExcelFile'])->name('importExcel');
        Route::post('/addGraph', [PersonnelController::class, 'addGraph'])->name('addGraph');
        Route::get('/getActivities', [PersonnelController::class, 'getActivities'])->name('getActivities');
    });

    // Calendar
    Route::prefix('calendarPage')->name('calendarPage.')->group(function () {
        Route::get('/', [CalendarController::class, 'index'])->name('index');
        Route::post('/create', [CalendarController::class, 'create'])->name('create');
        Route::put('/update/{id}', [CalendarController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [CalendarController::class, 'destroy'])->name('delete');
    });
    Route::get('/sendEmailEvent', [CalendarController::class, 'sendEmailEvent'])->name('sendEmail');

    //TypeServices
    Route::prefix('typeServices')->name('typeServices.')->group(function () {
        Route::get('/', [TypeServicesCalendarController::class, 'index'])->name('index');
    });

    //Management
    Route::prefix('management')->name('management.')->group(function () {
        Route::get('/', [ManagementController::class, 'index'])->name('index');
    });

    // Vistas
    Route::prefix('Sigedin')->group(function () {
        Route::get('Request/AddRequest', function () {
            return Inertia::render('Request/AddRequest');
        })->name('AddRequest');

        Route::get('Request/AssignRequest', function () {
            return Inertia::render('Request/AssignRequest');
        })->name('AssignRequest');

        Route::get('Personnel/Reports', function () {
            return Inertia::render('Personnel/Reports');
        })->name('Reports');

        Route::get('Profile/ProfileUser', function () {
            return Inertia::render('Profile/ProfileUser');
        })->name('Profile');

        Route::get('CalendarPage/CalendarPage', function () {
            return Inertia::render('CalendarPage/CalendarPage');
        })->name('CalendarPage');

        Route::get('Personnel/AddGraphoFromExcel', function () {
            return Inertia::render('Personnel/AddGraphoFromExcel');
        })->name('AddGraphoFromExcel');

        Route::get('Charts/ChartsMain', function () {
            return Inertia::render('Charts/ChartsMain');
        })->name('ChartsMain');
    });
});
