<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalendarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'starting_date' => 'required|date',
            'ending_date' => 'required|date',
            'participants_necesary' => 'required|string',
            'backgroundColor' => 'required|string',
            'division' => 'required|string',
            'isVRRequired' => 'required|boolean',
            'type_service_ID' => 'required|array',
            'uid_user' => 'required|string',
            'calendar_status' => 'required|boolean',
            'floor' => 'required|string',
        ];
    }
}