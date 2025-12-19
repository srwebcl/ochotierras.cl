<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\HeroSection;

Route::get('/hero-section', function () {
    $hero = HeroSection::where('is_active', true)->latest()->first();
    if (!$hero)
        return null;

    $images = $hero->images ?? [];
    $imageUrls = array_map(fn($img) => \Illuminate\Support\Facades\Storage::url($img), $images);

    return [
        'title' => $hero->title,
        'subtitle' => $hero->subtitle,
        'description' => $hero->description,
        'buttonText' => $hero->button_primary_text, // Fixed to use correct column name
        'image' => $imageUrls[0] ?? null,
        'images' => $imageUrls,
    ];
});

Route::get('/collection-wines', function () {
    return \App\Models\Product::where('is_active', true)
        ->where('is_featured', true)
        ->get()
        ->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'subtitle' => $product->subtitle,
                'type' => $product->type,
                'price' => (int) $product->price,
                'stock' => (int) $product->stock,
                'image' => $product->image ? \Illuminate\Support\Facades\Storage::url($product->image) : null,
                'bgGradient' => $product->type === 'Tinto'
                    ? "radial-gradient(circle at center, #5e0916 0%, transparent 70%)"
                    : ($product->type === 'Blanco'
                        ? "radial-gradient(circle at center, #ffd700 0%, transparent 70%)"
                        : "radial-gradient(circle at center, #2a2a2a 0%, transparent 70%)"),
                'accentColor' => 'text-brand-gold', // Using class for now or could send color hex to be used in inline style
                'accentColorHex' => $product->accent_color ?? '#D4AF37',
                'description' => $product->featured_description ?? strip_tags($product->description),
            ];
        });
});

Route::post('/payment/init', [App\Http\Controllers\PaymentController::class, 'init']);
Route::get('/payment/confirm-mock', [App\Http\Controllers\PaymentController::class, 'confirmMock']);
