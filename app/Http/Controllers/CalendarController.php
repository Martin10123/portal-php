<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calendar;
use App\Http\Requests\CalendarRequest;
use App\Http\Controllers\TypeServicesCalendarController;

class CalendarController extends Controller
{
    public function index()
    {
        try {
            $calendar = Calendar::all();

            return response()->json([
                'message' => 'Datos obtenidos correctamente',
                'data' => $calendar,
                "ok" => true
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los datos',
                'error' => $e,
                "ok" => false
            ]);
        }
    }

    public function create(CalendarRequest $request)
    {
        try {
            $responseDB = Calendar::create([
                'title' => $request->title,
                'description' => $request->description,
                'starting_date' => $request->starting_date,
                'ending_date' => $request->ending_date,
                'participants_necesary' => $request->participants_necesary,
                'participants_optional' => $request->participants_optional,
                'resource' => $request->resource,
                'backgroundColor' => $request->backgroundColor,
                'division' => $request->division,
                'isVRRequired' => $request->isVRRequired,
                'type_service_ID' => $request->type_service_ID,
                'uid_user' => $request->uid_user,
                'calendar_status' => $request->calendar_status,
            ]);

            $typeServicesController = new TypeServicesCalendarController();
            $exitsThisType = $typeServicesController->exitsType($request->type_service_ID);

            return response()->json([
                "newType" => $exitsThisType ? "Tipo de servicio creado correctamente " . $exitsThisType->description : null,
                'message' => 'Evento creado en el calendario correctamente',
                'data' => $responseDB,
                "ok" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al guardar los datos de la base de datos',
                "error" => $th,
                "ok" => false
            ], 500);
        }
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }

    public function getCalendarEvents()
    {
    }
}