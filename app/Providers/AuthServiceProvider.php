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
                    ->where('Estado', 'Activo')
                    ->select('IsAdmin', 'IdResponsable')
                    ->get()
                    ->first();

                if ($userSelect == null) {
                    $request->session()->put('IsPrivileged', -1);
                    return $userDA;
                }

                $request->session()->put('IsAdmin', $userSelect->IsAdmin);
                $request->session()->put('IdResponsable', $userSelect->IdResponsable);
                $request->session()->put('IsPrivileged', $userSelect->IsAdmin == 1 && strtoupper($userSelect->userDA) == 'GEDIN') ? 1 : 0;

                return $userDA;
            }
        });
    }
}