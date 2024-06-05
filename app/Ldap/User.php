<?php

namespace App\Ldap;

use LdapRecord\Models\Model;

class User extends Model
{
    /**
     * The object classes of the LDAP model.
     */
    public static array $objectClasses = [];

    protected $guidKey = 'uuid';

    public function guardName()
    {
        return "web";
    }

    public function photo()
    {
        $value = $this->thumbnailphoto ?? null;
        // Due to LDAP's multi-valued nature, all values will be
        // contained inside of an array. We will attempt to
        // retrieve the first one, or supply a default.
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
}