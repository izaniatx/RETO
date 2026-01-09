<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes';

    protected $fillable = [
        'user_id'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

}
