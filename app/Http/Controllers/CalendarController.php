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
            $calendar = Calendar::with('typeServices')->get();

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
                'type_service_ID' => $request->type_service_ID["type_service_ID"],
                'uid_user' => $request->uid_user,
                'calendar_status' => $request->calendar_status,
            ]);

            $typeServicesController = new TypeServicesCalendarController();
            $typeServicesController->exitsType($request->type_service_ID["description"]);

            return response()->json([
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

    public function update(CalendarRequest $request, $id)
    {
        try {
            $calendar = Calendar::find($id);

            $calendar->title = $request->title;
            $calendar->description = $request->description;
            $calendar->starting_date = $request->starting_date;
            $calendar->ending_date = $request->ending_date;
            $calendar->participants_necesary = $request->participants_necesary;
            $calendar->participants_optional = $request->participants_optional;
            $calendar->resource = $request->resource;
            $calendar->backgroundColor = $request->backgroundColor;
            $calendar->division = $request->division;
            $calendar->isVRRequired = $request->isVRRequired;
            $calendar->type_service_ID = $request->type_service_ID["type_service_ID"];
            $calendar->uid_user = $request->uid_user;
            $calendar->calendar_status = $request->calendar_status;

            $calendar->save();

            return response()->json([
                'message' => 'Evento actualizado en el calendario correctamente',
                'data' => $calendar,
                "ok" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar los datos de la base de datos',
                "error" => $th,
                "ok" => false
            ], 500);
        }
    }

    public function destroy($id)
    {
    }
}