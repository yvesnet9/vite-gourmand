<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plat extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'type',
        'image_url',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];

    // Relations
    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'menu_plat');
    }

    public function allergenes()
    {
        return $this->belongsToMany(Allergene::class, 'plat_allergene');
    }
}
