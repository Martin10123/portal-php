<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use App\Http\Requests\CalendarRequest;
use App\Http\Controllers\TypeServicesCalendarController;
use App\Models\CalendarLog;
use App\Notifications\EventCalendarMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class CalendarController extends Controller
{
    public function index()
    {
        try {
            $calendar = Calendar::with('typeServices')
                ->where('calendar_status', 1)
                ->get();

            return response()->json([
                'message' => 'Datos obtenidos correctamente',
                'data' => $calendar,
                "ok" => true,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los datos',
                'error' => $e,
                "ok" => false
            ]);
        }
    }

    public function getReason($id)
    {
        try {
            $reasons = CalendarLog::where('Calendar_ID', $id)->first();

            return response()->json([
                'message' => 'Datos obtenidos correctamente',
                'data' => $reasons,
                "ok" => $reasons ? true : false,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los datos',
                'error' => $e,
                "ok" => false
            ]);
        }
    }

    protected function handleTypeServiceID($typeServiceData)
    {
        try {
            if (!array_key_exists('type_service_ID', $typeServiceData)) {
                $typeService = $this->checkTypeService($typeServiceData["description"]);
                $typeServiceData["type_service_ID"] = $typeService->type_service_ID;
                $typeServiceData["description"] = $typeService->description;
            }
            return $typeServiceData;
        } catch (\Throwable $th) {
            Log::error('Error al verificar el tipo de servicio: ' . $th->getMessage());
            throw $th;
        }
    }

    public function create(CalendarRequest $request)
    {
        try {
            // Maneja el type_service_ID
            $typeServiceData = $this->handleTypeServiceID($request->type_service_ID);

            // Asignar el array modificado de nuevo al objeto $request
            $request->merge(['type_service_ID' => $typeServiceData]);

            // Crea el evento en el calendario
            $responseDB = $this->createCalendarEvent($request);
            $responseDB->type_service_ID = $request->type_service_ID;

            // Envía notificaciones a los participantes
            $this->notifyParticipants(
                $request->userCreated,
                $request->participants_necesary,
                $request->participants_optional,
                $responseDB,
                false
            );

            return response()->json([
                'message' => 'Evento creado en el calendario correctamente',
                'data' => $responseDB,
                'ok' => true
            ]);
        } catch (\Exception $e) {
            // Manejo de errores más específico
            Log::error('Error en la creación del evento: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al guardar los datos de la base de datos',
                'error' => $e->getMessage(),
                'ok' => false
            ], 500);
        }
    }

    /**
     * Crea un evento en el calendario.
     *
     * @param CalendarRequest $request
     * @return Calendar
     */
    protected function createCalendarEvent(CalendarRequest $request)
    {
        return Calendar::create([
            'title' => $request->title,
            'description' => $request->description,
            'starting_date' => $request->starting_date,
            'ending_date' => $request->ending_date,
            'participants_necesary' => $request->participants_necesary,
            'participants_optional' => $request->participants_optional,
            'resource' => $request->resource,
            'backgroundColor' => "#0099ff",
            'division' => $request->division,
            'isVRRequired' => $request->isVRRequired,
            'type_service_ID' => $request->type_service_ID["type_service_ID"],
            'uid_user' => $request->userCreated["guid"],
            'calendar_status' => $request->calendar_status,
            'sala' => $request->floor,
            'IsSerial' => $request->isRepeatPeriod
        ]);
    }

    /**
     * Verifica si el tipo de servicio existe.
     *
     * @param string $description
     */
    protected function checkTypeService($description)
    {
        $typeServicesController = new TypeServicesCalendarController();
        return $typeServicesController->exitsType($description);
    }

    /**
     * Envía notificaciones a los participantes.
     *
     * @param string $participantsNecesary
     * @param string $participantsOptional
     * @param Calendar $responseDB
     * @return void
     */
    protected function notifyParticipants($userCreated, $participantsNecesary, $participantsOptional, $responseDB, $isUpdate)
    {
        try {
            // Obtener y unificar los correos de los participantes necesarios y opcionales
            $emails = array_unique(array_merge(
                explode('; ', $participantsNecesary),
                explode('; ', $participantsOptional)
            ));

            // Agregar los correos de los usuarios especiales
            $specialUsers = [
                "msimarra@cotecmar.com",
                // "jtapia@cotecmar.com",
                // "gbarros@cotecmar.com"
            ];

            $emails = array_unique(array_merge($emails, $specialUsers));

            // Enviar notificaciones a todos los correos
            foreach ($emails as $email) {
                try {
                    Notification::route('mail', trim($email))->notify(new EventCalendarMail($responseDB, $isUpdate, $userCreated));
                } catch (\Exception $e) {
                    Log::error('Error al enviar el correo a ' . $email . ': ' . $e->getMessage());
                }
            }
        } catch (\Throwable $th) {
            Log::error('Error al enviar las notificaciones: ' . $th . $th->getMessage());
        }
    }

    public function update(CalendarRequest $request, $id)
    {
        try {
            $calendar = Calendar::find($id);

            // Maneja el type_service_ID
            $typeServiceData = $this->handleTypeServiceID($request->type_service_ID);

            // Asignar el array modificado de nuevo al objeto $request
            $request->merge(['type_service_ID' => $typeServiceData]);

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
            $calendar->type_service_ID = $typeServiceData["type_service_ID"];
            $calendar->uid_user = $request->userCreated["guid"];
            $calendar->calendar_status = $request->calendar_status;

            $calendar->save();

            $calendar->type_service_ID = $request->type_service_ID;

            $respReason = $this->reasonCancelOrUpdateEvent($request->reason, $id, true);

            $this->notifyParticipants(
                $request->userCreated,
                $request->participants_necesary,
                $request->participants_optional,
                $calendar,
                true
            );

            return response()->json([
                'message' => 'Evento actualizado en el calendario correctamente',
                'data' => $calendar,
                'motivo' => $respReason,
                "ok" => true
            ]);
        } catch (\Throwable $th) {
            Log::error("error" . $th->getMessage() . $th->getFile());

            return response()->json([
                'message' => 'Error al actualizar los datos de la base de datos',
                "error" => $th->getMessage(),
                "ok" => false
            ], 500);
        }
    }

    public function destroy($id, $reason)
    {
        try {

            $calendar = Calendar::find($id);
            $calendar->calendar_status = 0;
            $calendar->save();

            $respReason = $this->reasonCancelOrUpdateEvent($reason, $id, false);

            return response()->json([
                'message' => 'Evento eliminado en el calendario correctamente',
                'data' => $calendar,
                'motivo' => json_decode($respReason->content())->data,
                "ok" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al eliminar los datos de la base de datos',
                "error" => $th,
                "ok" => false
            ], 500);
        }
    }

    public function reasonCancelOrUpdateEvent($reason, $idCalendar, $isUpdate)
    {
        try {
            $exitsCalendar = CalendarLog::where('Calendar_ID', $idCalendar)->first();

            if ($exitsCalendar) {
                $exitsCalendar->Log_Test = $reason;
                $exitsCalendar->Calendar_Estado = $isUpdate ? 'Editado' : 'Eliminado';
                $exitsCalendar->save();

                return response()->json([
                    'message' => 'Motivo actualizado correctamente',
                    'data' => $exitsCalendar,
                    "ok" => true
                ]);
            }

            $infoCalendar = CalendarLog::create([
                'Calendar_ID' => $idCalendar,
                'Calendar_Estado' => $isUpdate ? 'Editado' : 'Eliminado',
                'Log_Test' => $reason
            ]);

            return response()->json([
                'message' => 'Motivo guardado correctamente',
                'data' => $infoCalendar,
                "ok" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los datos',
                'error' => $th,
                "ok" => false
            ]);
        }
    }
}