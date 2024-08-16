<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Detalles del Evento</title>

    <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,600;1,100;1,200;1,400&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,800;1,100;1,200;1,300;1,400;1,500;1,700&display=swap");

        html {
            scroll-behavior: smooth;
        }

        * {
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
            margin: 0;
            padding: 0;
            text-decoration: none;
        }

        .main {
            padding: 1rem;
            width: 100%;
        }

        .titulo {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        .descripcion {
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }

        .titulo_detalle {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 500;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }

        th,
        td {
            padding: 0.5rem;
            text-align: left;
            border: 1px solid #ddd;
        }

        th {
            background-color: #f4f4f4;
            font-weight: 600;
        }

        td {
            font-weight: 500;
        }

    </style>
</head>

<body>
    <main class="main">
        <section>
            <h2 class="titulo">Cordial saludo</h2>
            <p class="descripcion">Se ha agendado un espacio en {{ $evento->sala }} y fuiste citado a esta reunión.</p>

            <div class="detalle">
                <h3 class="titulo_detalle">Detalles del evento</h3>

                <table>
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
                        <th>Fecha y hora de inicio</th>
                        <td>{{ \Carbon\Carbon::parse($evento->starting_date)->isoFormat('dddd, D [de] MMMM [de] YYYY [a las] h:mm A') }}</td>
                    </tr>
                    <tr>
                        <th>Fecha y hora de fin</th>
                        <td>{{ \Carbon\Carbon::parse($evento->ending_date)->isoFormat('dddd, D [de] MMMM [de] YYYY [a las] h:mm A') }}</td>
                    </tr>
                    <tr>
                        <th>Gerencia</th>
                        <td>{{ $evento->division }}</td>
                    </tr>
                    <tr>
                        <th>¿Se requiere el equipo de realidad extendida?</th>
                        <td>{{ $evento->isVRRequired == 1 || $evento->isVRRequired == "1" || $evento->isVRRequired ? 'Sí ' : 'No ' }} es necesario</td>
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
                            <a href="{{ strpos($resource, 'http') === 0 ? $resource : 'http://' . $resource }}" target="_blank">{{ $resource }}</a>

                            @if(!$loop->last)
                            ,
                            @endif
                            @endforeach
                            @else
                            No se ha asignado un recurso
                            @endif
                        </td>
                    </tr>
                </table>
            </div>
        </section>
    </main>
</body>

</html>