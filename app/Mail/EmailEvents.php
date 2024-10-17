<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailEvents extends Mailable
{
    use Queueable, SerializesModels;

    public $evento;
    public $isUpdate;
    public $userCreated;

    /**
     * Create a new message instance.
     */
    public function __construct($evento, $isUpdate, $userCreated)
    {
        $this->evento = $evento;
        $this->isUpdate = $isUpdate;
        $this->userCreated = $userCreated;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[RESERVAS XRLAB] ' . $this->evento->title,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.eventDetails',
            with: [
                'evento' => $this->evento,
                'isUpdate' => $this->isUpdate,
                'userCreated' => $this->userCreated,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $icsContent = $this->generateICSContent($this->evento);
        $icsFilename = 'EventoReservado.ics';

        // Guardar el contenido ICS en un archivo temporal
        $tempFilePath = sys_get_temp_dir() . '/' . $icsFilename;
        file_put_contents($tempFilePath, $icsContent);

        // Crear y devolver el adjunto con el método estático fromPath()
        return [
            Attachment::fromPath($tempFilePath)
                ->as($icsFilename)
                ->withMime('text/calendar'),
        ];
    }

    private function generateICSContent($evento)
    {
        // Formatea las fechas
        $start = date('Ymd\THis', strtotime($evento->starting_date));
        $end = date('Ymd\THis', strtotime($evento->ending_date));

        $description = "{$evento->description}\\n\\n";
        $description .= "Razón: {$evento->type_service_ID["description"]}\\n\\n";
        $description .= "Resource: {$evento->resource}";

        $icsContent = <<<ICS
        BEGIN:VCALENDAR
        VERSION:2.0
        PRODID:-//Cotecmar//NONSGML v1.0//EN
        BEGIN:VEVENT
        UID:{$this->userCreated["username"]}@cotecmar.com
        DTSTAMP:{$start}Z
        DTSTART:{$start}
        DTEND:{$end}
        SUMMARY:[RESERVAS XRLAB] {$evento->title}
        LOCATION:{$evento->floor["Sala_Name"]}
        DESCRIPTION:{$description}
        END:VEVENT
        END:VCALENDAR
        ICS;

        return $icsContent;
    }
}