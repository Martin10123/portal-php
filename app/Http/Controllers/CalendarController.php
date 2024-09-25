<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use App\Http\Requests\CalendarRequest;
use App\Http\Controllers\TypeServicesCalendarController;
use App\Mail\EmailEvents;
use App\Models\CalendarFloor;
use App\Models\CalendarLog;
use App\Models\CalendarRespFloor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CalendarController extends Controller
{
    public function index($floor)
    {
        try {

            $calendar = Calendar::with(['typeServices', 'floor'])
                ->where('sala', $floor)
                ->where('calendar_status', 1)
                ->get();

            return response()->json([
                'message' => 'Se obtuvieron los datos de los eventos correctamente',
                'data' => $calendar,
                "ok" => true,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los datos de la base de datos',
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
            $conflictingEvent = Calendar::where('sala', $request->floor)
                ->where('calendar_status', 1)
                ->where(function ($query) use ($request) {
                    $query->whereBetween('starting_date', [$request->starting_date, $request->ending_date])
                        ->orWhereBetween('ending_date', [$request->starting_date, $request->ending_date]);
                })
                ->first();

            if ($conflictingEvent) {
                return response()->json([
                    'message' => 'Hay un conflicto con otro evento en el mismo horario y sala.',
                    'ok' => false
                ], 409);
            }

            // Maneja el type_service_ID
            $typeServiceData = $this->handleTypeServiceID($request->type_service_ID);

            // Asignar el array modificado de nuevo al objeto $request
            $request->merge(['type_service_ID' => $typeServiceData]);

            // Crea el evento en el calendario
            $responseDB = $this->createCalendarEvent($request);
            $responseDB->type_service_ID = $request->type_service_ID;
            $responseDB->floor = $request->floor;

            // Envía notificaciones a los participantes
            $this->notifyParticipants(
                $request->userCreated,
                $request->participants_necesary,
                $request->participants_optional,
                $responseDB,
                false,
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
            'backgroundColor' => $request->backgroundColor,
            'division' => $request->division,
            'isVRRequired' => $request->isVRRequired,
            'type_service_ID' => $request->type_service_ID["type_service_ID"],
            'uid_user' => $request->userCreated["guid"],
            'calendar_status' => $request->calendar_status,
            'sala' => $request->floor["ID"],
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
            $emails = array_filter(array_unique(array_merge(
                explode('; ', $participantsNecesary),
                explode('; ', $participantsOptional)
            )));

            // Obtén correos especiales basados en la sala
            $emails = array_merge($emails, $this->getSpecialUsers($responseDB));

            // Filtra cualquier correo vacío
            $emails = array_filter(array_unique($emails));

            $emails = array_values($emails);

            Mail::to($emails)->send(new EmailEvents($responseDB, $isUpdate, $userCreated));
        } catch (\Throwable $th) {
            Log::error('Error al enviar las notificaciones: ' . $th->getMessage());
        }
    }

    protected function getSpecialUsers($responseDB)
    {
        $emails = [];

        foreach ($responseDB->floor["responsables"] as $responsable) {
            $emails[] = $responsable["Correo"];
        }

        return $emails;
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
            $calendar->sala = $request->floor["ID"];
            $calendar->description = $request->description;
            $calendar->starting_date = $request->starting_date;
            $calendar->ending_date = $request->ending_date;
            $calendar->participants_necesary = $request->participants_necesary;
            $calendar->participants_optional = $request->participants_optional;
            $calendar->resource = $request->resource;
            $calendar->division = $request->division;
            $calendar->isVRRequired = $request->isVRRequired;
            $calendar->type_service_ID = $typeServiceData["type_service_ID"];
            $calendar->uid_user = $request->userCreated["guid"];
            $calendar->calendar_status = $request->calendar_status;
            $calendar->IsSerial = $request->isRepeatPeriod;

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

    // Calendar_Sala

    public function getAllFloors()
    {
        try {

            $floors = CalendarFloor::with(['responsables' => function ($query) {
                $query->select('idResponsable', 'Nombre', 'Correo', 'Cargo');
            }])
                ->where('estado', 1)
                ->get();

            $options = [
                [
                    'label' => 'Solicitudes',
                    'icon' => 'pi pi-folder-plus',
                    'isOnlyAdmin' => true,
                    'items' => [
                        [
                            'label' => 'Agregar solicitud',
                            'icon' => 'pi pi-file-plus',
                            'route' => '/Sigedin/Request/AddRequest',
                        ],
                    ],
                ],
                [
                    'label' => "Planillación",
                    'icon' => "pi pi-file-check",
                    'isOnlyAdmin' => true,
                    'items' => [
                        [
                            'label' => "Gestion de grafos",
                            'icon' => "pi pi-list-check",
                            'route' => "/Sigedin/Personnel/Reports",
                        ],
                    ],
                ],
                [
                    'label' => 'Reservar sala',
                    'icon' => 'pi pi-bell',
                    'items' => array_merge(
                        $floors->map(function ($floor) {
                            return [
                                'label' => $floor->Sala_Name,
                                'icon' => 'pi pi-calendar',
                                'route' => '/Sigedin/CalendarPage/CalendarPage?floor=' . urlencode($floor->ID),
                            ];
                        })->toArray(),
                        [
                            [
                                'label' => 'Gestionar salas',
                                'icon' => 'pi pi-clipboard',
                                'isOnlyAdmin' => true,
                                'route' => '/Sigedin/CalendarPage/AdminFloor',
                            ]
                        ]
                    ),
                ],
                [
                    'label' => 'Graficos',
                    'icon' => 'pi pi-chart-bar',
                    'isOnlyAdmin' => true,
                    'items' => [
                        [
                            'label' => 'Index',
                            'icon' => 'pi pi-chart-pie',
                            'route' => '/Sigedin/Charts/ChartsMain',
                        ],
                    ],
                ],
            ];

            return response()->json([
                "message" => "Datos obtenidos correctamente de las salas",
                "data" => $floors,
                "options" => $options,
                "ok" => true
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al obtener los datos de la base de datos de las salas',
                'error' => $th,
                "ok" => false
            ]);
        }
    }

    // Validar existencia de color
    private function validateExistsColor($Sala_Color)
    {
        try {
            return CalendarFloor::where('Sala_Color', $Sala_Color)->exists();
        } catch (\Throwable $th) {
            Log::error('Error al verificar si el color de la sala existe: ' . $th->getMessage());
            throw $th; // Es mejor relanzar la excepción para manejarla externamente
        }
    }

    // Guardar responsables
    private function saveResponsables($floorId, $responsables)
    {
        foreach ($responsables as $responsable) {
            CalendarRespFloor::create([
                'sala_id' => $floorId,
                'id_resp' => $responsable["idResponsable"],
                'estado' => 1
            ]);
        }
    }

    public function addFloor(Request $request)
    {
        DB::beginTransaction();

        try {
            if ($this->validateExistsColor($request->Sala_Color["valueC"])) {
                return response()->json([
                    'message' => 'El color de la sala ya está en uso. Por favor, elige otro color.',
                    'ok' => false
                ], 400);
            }

            // Crear la sala
            $floor = CalendarFloor::create([
                'Sala_Name' => $request->Sala_Name,
                'Sala_Alias' => $request->Sala_Alias,
                'Sala_Color' => $request->Sala_Color["valueC"],
                'estado' => 1
            ]);

            // Guardar responsables
            $this->saveResponsables($floor->ID, $request->Responsables);
            $floor->Sala_Color = $request->Sala_Color;

            DB::commit();

            return response()->json([
                'message' => 'Sala guardada correctamente',
                'data' => $floor,
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Error al guardar la sala o responsables: ' . $th->getMessage());

            return response()->json([
                'message' => 'Error al guardar la sala o los responsables en la base de datos',
                'error' => $th,
                'ok' => false
            ]);
        }
    }

    public function updateFloor(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $floor = CalendarFloor::find($id);

            if ($floor->Sala_Color !== $request->Sala_Color["valueC"]) {

                if ($this->validateExistsColor($request->Sala_Color["valueC"])) {
                    return response()->json([
                        'message' => 'El color de la sala ya está en uso. Por favor, elige otro color.',
                        'ok' => false
                    ], 400);
                }
            }

            // Actualizar la sala
            $floor->update([
                'Sala_Name' => $request->Sala_Name,
                'Sala_Alias' => $request->Sala_Alias,
                'Sala_Color' => $request->Sala_Color["valueC"],
                'estado' => $request->Sala_Estado
            ]);

            $floor->Sala_Color = $request->Sala_Color;

            // Eliminar responsables anteriores y guardar los nuevos
            CalendarRespFloor::where('sala_id', $id)->delete();
            $this->saveResponsables($id, $request->Responsables);

            DB::commit();

            return response()->json([
                'message' => 'Sala actualizada correctamente',
                'data' => $floor,
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error('Error al actualizar la sala o responsables: ' . $th->getMessage());

            return response()->json([
                'message' => 'Error al actualizar la sala o los responsables en la base de datos',
                'error' => $th->getMessage(),
                'ok' => false
            ], 500);
        }
    }

    public function deleteFloor($id)
    {
        try {

            $floor = CalendarFloor::find($id);
            $floor->estado = 0;
            $floor->save();

            return response()->json([
                'message' => 'Sala eliminada correctamente',
                'data' => $floor,
                'ok' => true
            ]);
        } catch (\Throwable $th) {

            Log::error('Error al eliminar la sala: ' . $th->getMessage());

            return response()->json([
                'message' => 'Error al eliminar la sala en la base de datos',
                'error' => $th->getMessage(),
                'ok' => false
            ], 500);
        }
    }
}