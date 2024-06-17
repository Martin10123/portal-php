<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequerimentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'Caso' => ['required', 'numeric'],
            'Buque' => ['required', 'string'],
            'Proceso' => ['required', 'numeric'],
            'ClienteExterno' => ['required', 'string'],
            'TipoBuque' => ['required', 'string'],
            'Planta' => ['required', 'string'],
            'Solicitante' => ['required', 'string'],
            'CorreoSolicitante' => ['required', 'string'],
            'Interesado' => ['required', 'string'],
            'CorreoInteresado' => ['required', 'string'],
            'IdTipoServicio' => ['required', 'numeric'],
            'Detalle' => ['required', 'string'],
            'Titulo' => ['required', 'string'],
            'FechaSolicitud' => ['required', 'date'],
            'usuarioIngreso' => ['required', 'string'],
            'FechaSolucion' => ['required', 'date'],
            'Estado' => ['required', 'string'],
            'OT' => ['required', 'string'],
        ];
    }
}