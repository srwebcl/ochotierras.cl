<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\HeroSection;
use App\Models\Category;

Route::get('/categories-wines', function () {
    return Category::where('is_active', true)
        ->orderBy('sort_order', 'asc')
        ->with([
            'products' => function ($query) {
                $query->where('is_active', true);
            }
        ])
        ->get()
        ->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'nameEn' => $category->name_en,
                'slug' => $category->slug,
                'wines' => $category->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'nameEn' => $product->name_en,
                        'subtitle' => $product->subtitle,
                        'slug' => $product->slug,
                        'image' => $product->image ? \Illuminate\Support\Facades\Storage::url($product->image) : null,
                        'price' => (int) $product->price,
                        'stock' => (int) $product->stock,
                        'technical_sheet' => $product->technical_sheet ? \Illuminate\Support\Facades\Storage::url($product->technical_sheet) : null,
                        'harvest_year' => $product->harvest_year,
                        'harvest_type' => $product->harvest_type,
                        'origin' => $product->origin,
                        'vineyard_location' => $product->vineyard_location,
                        'presentation' => $product->presentation,
                        'closure_type' => $product->closure_type,
                        'varietal_composition' => $product->varietal_composition,
                        'aging_potential' => $product->aging_potential,
                        'wood_type' => $product->wood_type,
                        'alcohol' => $product->alcohol,
                        'residual_sugar' => $product->residual_sugar,
                        'total_ph' => $product->total_ph,
                        'volatile_acidity' => $product->volatile_acidity,
                        'total_acidity' => $product->total_acidity,
                        'tasting_notes' => $product->tasting_notes,
                        'tastingNotesEn' => $product->tasting_notes_en,
                        'awards' => $product->awards,
                        'description' => $product->description,
                        'descriptionEn' => $product->description_en,
                        'bgGradient' => $product->type === 'Tinto'
                            ? "radial-gradient(circle at center, #5e0916 0%, transparent 70%)"
                            : ($product->type === 'Blanco'
                                ? "radial-gradient(circle at center, #ffd700 0%, transparent 70%)"
                                : "radial-gradient(circle at center, #2a2a2a 0%, transparent 70%)"),
                        'accentColorHex' => $product->accent_color ?? '#D4AF37',
                    ];
                })
            ];
        });
});

Route::get('/hero-section', function () {
    $heroes = HeroSection::where('is_active', true)->orderBy('sort_order', 'asc')->get();

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
            'titleEn' => $hero->title_en,
            'subtitle' => $hero->subtitle,
            'subtitleEn' => $hero->subtitle_en,
            'description' => $hero->description,
            'buttonText' => $hero->button_primary_text,
            'buttonTextEn' => $hero->button_primary_text_en,
            'buttonPrimaryUrl' => $hero->button_primary_url,
            'buttonSecondaryText' => $hero->button_secondary_text,
            'buttonSecondaryTextEn' => $hero->button_secondary_text_en,
            'buttonSecondaryUrl' => $hero->button_secondary_url,
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
                'descriptionEn' => $product->short_description_en ?? $product->description_en, // Fallback logic
                'slug' => $product->slug,
            ];
        });
});

Route::get('/products', function () {
    return \App\Models\Product::where('is_active', true)
        ->with('category')
        ->get()
        ->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'subtitle' => $product->subtitle,
                'type' => $product->type,
                'category_name' => $product->category ? $product->category->name : null,
                'category_slug' => $product->category ? $product->category->slug : null,
                'price' => (int) $product->price,
                'stock' => (int) $product->stock,
                'image' => $product->image ? \Illuminate\Support\Facades\Storage::url($product->image) : null,
                'bgGradient' => $product->type === 'Tinto'
                    ? "radial-gradient(circle at center, #5e0916 0%, transparent 70%)"
                    : ($product->type === 'Blanco'
                        ? "radial-gradient(circle at center, #ffd700 0%, transparent 70%)"
                        : "radial-gradient(circle at center, #2a2a2a 0%, transparent 70%)"),
                'accentColor' => 'text-brand-gold',
                'accentColorHex' => $product->accent_color ?? '#D4AF37',
                'description' => $product->description,
                'descriptionEn' => $product->description_en,
                'slug' => $product->slug,
                'gallery' => $product->gallery ? array_map(fn($img) => \Illuminate\Support\Facades\Storage::url($img), $product->gallery) : [],
                'technical_details' => $product->technical_details,
                'technical_sheet' => $product->technical_sheet ? \Illuminate\Support\Facades\Storage::url($product->technical_sheet) : null,
                'vintage_year' => $product->vintage_year,
                'strain' => $product->strain,
                'origin' => $product->origin,
                'tastingNotesEn' => $product->tasting_notes_en,
                'pairingEn' => $product->pairing_en,
                'serviceTempEn' => $product->service_temp_en,
            ];
        });
});

Route::get('/categories', function () {
    return Category::where('is_active', true)
        ->orderBy('sort_order', 'asc')
        ->get()
        ->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'nameEn' => $category->name_en,
                'slug' => $category->slug,
            ];
        });
});

Route::post('/payment/init', [App\Http\Controllers\PaymentController::class, 'init']);
Route::get('/payment/confirm-mock', [App\Http\Controllers\PaymentController::class, 'confirmMock']);

Route::post('/shipping/calculate', function (Request $request) {
    $request->validate([
        'region' => 'required|string',
    ]);

    $region = $request->input('region');

    // Find a zone that includes this region
    // Since we store regions as a JSON array, we can filter manually or use whereJsonContains if database supports it.
    // SQLite/MySQL support whereJsonContains, but sometimes it's tricky with simple arrays.
    // Let's grab all active zones and filter in PHP for reliability with the flexible JSON structure.

    $zones = \App\Models\ShippingZone::where('is_active', true)->get();

    $matchedZone = $zones->first(function ($zone) use ($region) {
        return is_array($zone->regions) && in_array($region, $zone->regions);
    });

    if ($matchedZone) {
        return response()->json([
            'available' => true,
            'zone_name' => $matchedZone->name,
            'price' => $matchedZone->is_free_shipping ? 0 : (int) $matchedZone->price,
            'message' => $matchedZone->is_free_shipping ? 'Envío Gratis' : null,
        ]);
    }

    return response()->json([
        'available' => false,
        'message' => 'No tenemos cobertura de envío para esta región actualmente.',
        'price' => 0,
    ]);
});
