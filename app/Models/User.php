<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    const USERS = [
        'Пупкин',
        'Бананковский',
        'Работяга',
        'Свинтушкин',
        'Виртуальная сопля',
        'Сильвестр в столовой',
        'Лысый из BRAZZERS',
        'Чумовой гульфик'
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'session_id',
        'api_token'
    ];

    public function getRandomNameAttribute()
    {
        return static::USERS[array_rand(static::USERS)];
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
