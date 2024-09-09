<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles del Evento</title>
    <style>
    body {
        font-family: 'Poppins', Arial, sans-serif;
        margin: 0;
        padding: 0;
    }

    h2,
    h3 {
        color: #333;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    th,
    td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
    }

    a {
        color: #3498db;
    }

    .titulo {
        font-weight: 600;
    }

    .detalle {
        margin-top: 20px;
    }
    </style>
</head>

<body>
    <main class="main">
        <section>
            <h2>Cordial saludo</h2>
            <p>{{ $userCreated["name"] }}
                {{ $isUpdate ? 'ha actualizado la reserva en' : 'ha agendado un espacio en' }} {{ $evento->sala }} y
                te ha incluido como participante. A continuación, encontrarás los detalles del evento.
            </p>

            <div>
                <h3>{{ $isUpdate ? 'Actualización' : 'Detalles' }} del evento</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Datos</th>
                            <th>Información</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Título</th>
                            <td>{{ $evento->title }}</td>
                        </tr>
                        <tr>
                            <th>Sala</th>
                            <td>{{ $evento->sala }}</td>
                        </tr>
                        <tr>
                            <th>Descripción</th>
                            <td>{{ $evento->description }}</td>
                        </tr>
                        <tr>
                            <th>Fecha de inicio</th>
                            <td>{{ \Carbon\Carbon::parse($evento->starting_date)->locale('es')->isoFormat('dddd, D [de] MMMM [de] YYYY [a las] h:mm A') }}
                            </td>
                        </tr>
                        <tr>
                            <th>Fecha de fin</th>
                            <td>{{ \Carbon\Carbon::parse($evento->ending_date)->locale('es')->isoFormat('dddd, D [de] MMMM [de] YYYY [a las] h:mm A') }}
                            </td>
                        </tr>
                        <tr>
                            <th>Gerencia</th>
                            <td>{{ $evento->division }}</td>
                        </tr>
                        <tr>
                            <th>¿Experiencia en realidad extendida?</th>
                            <td>{{ $evento->isVRRequired ? 'Sí' : 'No' }} es necesario</td>
                        </tr>
                        <tr>
                            <th>Tipo de servicio</th>
                            <td>{{ $evento->type_service_ID['description'] }}</td>
                        </tr>
                        <tr>
                            <th>Participantes necesarios</th>
                            <td>{{ $evento->participants_necesary }}</td>
                        </tr>
                        <tr>
                            <th>Participantes opcionales</th>
                            <td>{{ $evento->participants_optional }}</td>
                        </tr>
                        <tr>
                            <th>Recursos</th>
                            <td>
                                @if($evento->resource != "")
                                @foreach(explode(",", $evento->resource) as $resource)
                                <a href="{{ strpos($resource, 'http') === 0 ? $resource : 'http://' . $resource }}"
                                    target="_blank">{{ $resource }}</a>
                                @if(!$loop->last), @endif
                                @endforeach
                                @else
                                No se ha asignado un recurso
                                @endif
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</body>

</html>