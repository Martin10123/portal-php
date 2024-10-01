<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\Fortify;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Fortify::authenticateUsing(function ($request) {

            $validated = Auth::validate([
                'samaccountname' => $request->username,
                'password' => $request->password
            ]);

            $userDA = Auth::getLastAttempted();

            if ($validated) {
                $usernameCotecmar = strtoupper("COTECMAR\\$request->username");

                $userSelect = DB::table('sigedin.guest.responsable')
                    ->where('usuario', $usernameCotecmar)
                    ->where('Estado', 'Activo')
                    ->select('IsAdmin', 'IdResponsable', 'EsJefe', 'IdDivision')
                    ->get()
                    ->first();

                if ($userSelect == null) {
                    $request->session()->put('IsPrivileged', -1);
                    return $userDA;
                }

                $request->session()->put('IsAdmin', $userSelect->IsAdmin);
                $request->session()->put('IdResponsable', $userSelect->IdResponsable);
                $request->session()->put('IsJefe', $userSelect->EsJefe);
                $request->session()->put('IdDivision', $userSelect->IdDivision);

                return $userDA;
            }
        });
    }
}