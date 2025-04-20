<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeatherController;
use App\Http\Controllers\Api\GeocodingController;

// Weather endpoints
Route::get('/weather', [WeatherController::class, 'current']);
Route::get('/forecast', [WeatherController::class, 'forecast']);

// Geocoding endpoints
Route::get('/geocoding', [GeocodingController::class, 'search']);