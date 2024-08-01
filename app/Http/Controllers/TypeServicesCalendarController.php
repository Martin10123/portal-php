<?php

namespace App\Http\Controllers;

use App\Models\TypeServices;

class TypeServicesCalendarController extends Controller
{
    public function index()
    {
        try {
            $data = TypeServices::all();

            return response()->json([
                'message' => 'Success',
                'data' => $data
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error',
                'data' => $th
            ], 500);
        }
    }

    public function exitsType($description)
    {
        try {
            $data = TypeServices::where('description', $description)->first();

            if (!$data) {
                return $this->create($description);
            }
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function create($newValue)
    {
        try {

            $responseDB = TypeServices::create([
                'description' => $newValue,
                'services_status' => true
            ]);

            return $responseDB;
        } catch (\Throwable $th) {
            return $th;
        }
    }
}