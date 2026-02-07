<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allergene extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'icone',
    ];

    // Relations
    public function plats()
    {
        return $this->belongsToMany(Plat::class, 'plat_allergene');
    }
}
