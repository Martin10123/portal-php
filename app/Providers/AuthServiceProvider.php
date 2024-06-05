<?php

namespace App\Providers;

//use Illuminate\Support\ServiceProvider;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
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

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Fortify::authenticateUsing(function ($request) {
            $validated = Auth::validate([
                'samaccountname' => $request->username,
                'password' => $request->password
            ]);

            $userDA = Auth::getLastAttempted();

            if ($validated) {
                $usernameCotecmat = strtoupper("COTECMAR\\$request->username");

                $userSelect = DB::table('sigedin.guest.responsable')
                    ->where('usuario', $usernameCotecmat)
                    ->select('IsAdmin', 'IdResponsable', 'Cedula', 'Nombre', 'usuario', 'Estado')
                    ->get()
                    ->first();

                if ($userSelect) {
                    $userDA->IsAdmin = $userSelect->IsAdmin;
                    $userDA->IdResponsable = $userSelect->IdResponsable;
                    $userDA->Estado = $userSelect->Estado;
                    $userDA->Cedula = $userSelect->Cedula;
                    $userDA->isPrivileged = strtoupper($userDA->gerencia) == 'GEDIN' && $userDA->IsAdmin == 1;
                }

                return $userDA;
            }
        });
    }
}