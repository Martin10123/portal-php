<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use LdapRecord\Laravel\Auth\HasLdapUser;
use LdapRecord\Laravel\Auth\LdapAuthenticatable;
use LdapRecord\Laravel\Auth\AuthenticatesWithLdap;


class User extends Authenticatable implements LdapAuthenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasLdapUser;
    use AuthenticatesWithLdap;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
        'photo',
        'gerencia',
        'oficina',
        'num_sap',
        'identificacion',
        'cargo',
        'IsAdmin',
        'IdResponsable',
        "IsJefe",
        'IdDivision',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getPhotoAttribute()
    {
        $value = $this->ldap->thumbnailphoto ?? null;
        // Due to LDAP's multi-valued nature, all values will be
        // contained inside of an array. We will attempt to
        // retrieve the first one, or supply a default.
        if (!isset($value)) {
            return $this->profile_photo_url;
        }
        $data = $value[0];
        $image = base64_encode($data);

        $mime = 'image/jpeg';

        if (function_exists('finfo_open')) {
            $finfo = finfo_open();

            $mime = finfo_buffer($finfo, $data, FILEINFO_MIME_TYPE);

            return "data:$mime;base64,$image";
        }

        return "data:$mime;base64,$image";
    }

    public function getGerenciaAttribute()
    {
        return $this->ldap->department[0] ?? null;
    }

    public function getOficinaAttribute()
    {
        return $this->ldap->physicaldeliveryofficename[0] ?? null;
    }

    public function getNumSapAttribute()
    {
        return $this->ldap->employeenumber[0] ?? null;
    }

    public function getIdentificacionAttribute()
    {
        return $this->ldap->employeeid[0] ?? null;
    }

    public function getCargoAttribute()
    {
        return $this->ldap->title[0] ?? null;
    }

    public function getIsAdminAttribute()
    {
        return session("IsAdmin") ?? null;
    }

    public function getIdResponsableAttribute()
    {
        return session("IdResponsable") ?? null;
    }

    public function getIsPrivilegedAttribute()
    {
        return session("IsPrivileged") ?? null;
    }

    public function getIsJefeAttribute()
    {
        return session("IsJefe") ?? null;
    }

    public function getIdDivisionAttribute()
    {
        return session("IdDivision") ?? null;
    }
}