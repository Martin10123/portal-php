<?php

use App\Http\Controllers\{
    CalendarController,
    ConsecutiveController,
    ManagementController,
    ProjectsController,
    PersonnelController,
    RequirementController,
    TipoServicioController,
    TypeServicesCalendarController,
    UserController
};
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
        Route::get('/getUsuariosGerencia', [UserController::class, 'getUsuariosGerencia'])->name('getUsuariosGerencia');
        Route::get('/consultaUsuariosXGerencia/{id}', [UserController::class, 'consultaUsuariosXGerencia'])->name('consultaUsuariosXGerencia');
        Route::get('/consultaCasoBuqueDePersonaSeleccionada/{id}', [UserController::class, 'consultaCasoBuqueDePersonaSeleccionada'])->name('consultaCasoBuqueDePersonaSeleccionada');
        Route::get('/consultaDatosSegunPersonaSeleccionada', [UserController::class, 'consultaDatosSegunPersonaSeleccionada'])->name('consultaDatosSegunPersonaSeleccionada');
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
        Route::get('/getReason/{id}', [CalendarController::class, 'getReason'])->name('getReason');
        Route::post('/create', [CalendarController::class, 'create'])->name('create');
        Route::put('/update/{id}', [CalendarController::class, 'update'])->name('update');
        Route::delete('/delete/{id}/{reason}', [CalendarController::class, 'destroy'])->name('delete');
    });

    //TypeServices
    Route::prefix('typeServices')->name('typeServices.')->group(function () {
        Route::get('/', [TypeServicesCalendarController::class, 'index'])->name('index');
    });

    //Management
    Route::prefix('management')->name('management.')->group(function () {
        Route::get('/', [ManagementController::class, 'index'])->name('index');
        Route::get('/getDivision', [ManagementController::class, 'getDivision'])->name('getDivision');
    });

    // Vistas
    Route::prefix('Sigedin')->group(function () {
        $routes = [
            'Request/AddRequest' => 'AddRequest',
            'Request/AssignRequest' => 'AssignRequest',
            'Personnel/Reports' => 'Reports',
            'Profile/ProfileUser' => 'Profile',
            'CalendarPage/CalendarPage' => 'CalendarPage',
            'Personnel/AddGraphoFromExcel' => 'AddGraphoFromExcel',
            'Charts/ChartsMain' => 'ChartsMain',
            'Charts/BarChart' => 'BarChart',
        ];

        foreach ($routes as $url => $name) {
            Route::get($url, fn() => Inertia::render($url))->name($name);
        }
    });
});
