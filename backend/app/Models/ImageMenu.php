<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageMenu extends Model
{
    use HasFactory;

    protected $table = 'images_menu';

    protected $fillable = [
        'menu_id',
        'url',
        'alt_text',
        'ordre',
    ];

    protected $casts = [
        'ordre' => 'integer',
    ];

    // Relations
    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
