<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonnelRequest extends FormRequest
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
            "id" => ['required', 'numeric'],
            'graph' => ['nullable', 'string'],
            'stage' => ['nullable', 'string'],
            'swbs' => ['nullable', 'string'],
            'operation' => ['nullable', 'string'],
            'state' => ['nullable', 'string'],
            'block' => ['nullable', 'string'],
            'project' => ['nullable', 'string'],
            'case' => ['nullable', 'string'],
            'codeSap' => ['nullable', 'string'],
            "reports" => ['nullable', 'array'],
        ];
    }
}