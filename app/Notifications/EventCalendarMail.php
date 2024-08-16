<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventCalendarMail extends Notification
{
    use Queueable;

    protected $evento;

    /**
     * Create a new notification instance.
     */
    public function __construct($evento)
    {
        $this->evento = $evento;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        $icsContent = $this->generateICSContent($this->evento);

        return (new MailMessage)
            ->subject('[RESERVAS XRLAB] ' . $this->evento->title)
            ->view('emails.eventDetails', ['evento' => $this->evento])
            ->attachData($icsContent, str_replace(' ', '', $this->evento->title) . '.ics', [
                'mime' => 'text/calendar'
            ]);
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
        UID:{$evento->id}@cotecmar.com
        DTSTAMP:{$start}Z
        DTSTART:{$start}
        DTEND:{$end}
        SUMMARY:[RESERVAS XRLAB] {$evento->title}
        LOCATION:{$evento->sala}
        DESCRIPTION:{$description}
        END:VEVENT
        END:VCALENDAR
        ICS;

        return $icsContent;
    }


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
