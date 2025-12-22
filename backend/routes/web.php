<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// TEMPORARY DEPLOYMENT ROUTE - DELETE AFTER USE
Route::get('/deploy-setup', function () {
    // 1. Run Migrations
    // Force option is needed in production
    \Illuminate\Support\Facades\Artisan::call('migrate --force');
    $migrationOutput = \Illuminate\Support\Facades\Artisan::output();

    // 2. Link Storage
    // Only works if symlink() is allowed on server
    try {
        \Illuminate\Support\Facades\Artisan::call('storage:link');
        $storageOutput = \Illuminate\Support\Facades\Artisan::output();
    } catch (\Exception $e) {
        $storageOutput = "Storage link failed (might already exist or permission denied): " . $e->getMessage();
    }

    // 3. Clear Caches
    \Illuminate\Support\Facades\Artisan::call('config:clear');
    \Illuminate\Support\Facades\Artisan::call('cache:clear');
    \Illuminate\Support\Facades\Artisan::call('route:clear');
    \Illuminate\Support\Facades\Artisan::call('view:clear');
    $cacheOutput = "Caches cleared.";

    return "<h1>Deployment Setup Completed</h1>
            <pre>
            <strong>Migration Output:</strong><br>$migrationOutput
            <br>
            <strong>Storage Link Output:</strong><br>$storageOutput
            <br>
            <strong>Cache Output:</strong><br>$cacheOutput
            </pre>";
});
