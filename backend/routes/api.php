<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\HeroSection;

Route::get('/hero-section', function () {
    $heroes = HeroSection::where('is_active', true)->latest()->get();

    if ($heroes->isEmpty()) {
        return null; // Handle empty state in frontend if needed
        // Or return empty array? Frontend expects null or array of HeroData.
        // If we return [], frontend logic needs to handle it.
        // Let's stick to null if no heroes, or empty array.
        // Original logic returned null if first() failed.
        // Let's return empty array if empty, compatible with map.
        // Actually, frontend expects `HeroSection | null` currently. We are changing it to `HeroSection[]`.
        // So returning [] is safer.
    }

    return $heroes->map(function ($hero) {
        $images = $hero->images ?? [];
        $imageUrls = array_map(fn($img) => \Illuminate\Support\Facades\Storage::url($img), $images);

        return [
            'title' => $hero->title,
            'subtitle' => $hero->subtitle,
            'description' => $hero->description,
            'buttonText' => $hero->button_primary_text,
            'image' => $imageUrls[0] ?? null,
            'images' => $imageUrls,
        ];
    });
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
