<?php

namespace App\Ldap;

use Illuminate\Support\Facades\Log;
use LdapRecord\Models\Model;

class User extends Model
{
    /**
     * The object classes of the LDAP model.
     */
    public static array $objectClasses = ['top', 'person', 'organizationalPerson', 'user'];

    protected string $guidKey = 'uuid';

    public function guardName()
    {
        return "web";
    }

    public function photo()
    {
        $value = $this->thumbnailphoto ?? null;
        if (!isset($value)) {
            return 'https://ui-avatars.com/api/?background=2E3092&color=fff&size=64&name=' . explode(' ', $this->name[0])[0] . '+' . explode(' ', $this->sn[0])[0];
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

    public function getIsAdmin()
    {
        return $this->admin[0] ?? null;
    }

    public function getIdResponsable()
    {
        return $this->idresponsable[0] ?? null;
    }

    public function getIsJefe()
    {
        return $this->isJefe[0] ?? null;
    }

    public function getIdDivision()
    {
        return $this->iddivision[0] ?? null;
    }

    public function getCedula()
    {
        return $this->employeeid[0] ?? null;
    }

    public function getEstado()
    {
        return $this->useraccountcontrol[0] ?? null;
    }

    public function getGerencia()
    {
        return $this->department[0] ?? null;
    }

    public function getOficina()
    {
        return $this->physicaldeliveryofficename[0] ?? null;
    }

    public function getNumSap()
    {
        return $this->employeenumber[0] ?? null;
    }

    public function getIdentificacion()
    {
        return $this->employeeid[0] ?? null;
    }

    public function getCargo()
    {
        return $this->title[0] ?? null;
    }
}