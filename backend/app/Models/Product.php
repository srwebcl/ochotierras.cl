<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'subtitle',
        'type',
        'slug',
        'description',
        'featured_description',
        'price',
        'image',
        'stock',
        'accent_color',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];
}
