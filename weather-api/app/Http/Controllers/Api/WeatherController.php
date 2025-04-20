<?php

/**
* Weather API Controller
* 
* Handles incoming API requests for weather data and interfaces with the
* OpenWeatherMap service. Provides endpoints for current weather conditions
* and multi-day forecasts based on geographic coordinates.
* 
* This controller performs parameter validation and returns appropriate
* HTTP status codes before delegating to the weather service.
*/

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OpenWeatherMapService;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
   protected $weatherService;

   /**
    * Inject the weather service dependency
    */
   public function __construct(OpenWeatherMapService $weatherService)
   {
       $this->weatherService = $weatherService;
   }

   /**
    * Get current weather conditions for a location
    * 
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */
   public function current(Request $request)
   {
       $lat = $request->query('lat');
       $lon = $request->query('lon');
       
       // Validate required coordinate parameters
       if (!$lat || !$lon) {
           return response()->json(['error' => 'Latitude and longitude are required'], 400);
       }
       
       // Fetch and return weather data
       $weather = $this->weatherService->getCurrentWeather($lat, $lon);
       
       return response()->json($weather);
   }

   /**
    * Get multi-day forecast for a location
    * 
    * @param Request $request
    * @return \Illuminate\Http\JsonResponse
    */
   public function forecast(Request $request)
   {
       $lat = $request->query('lat');
       $lon = $request->query('lon');
       
       // Validate required coordinate parameters
       if (!$lat || !$lon) {
           return response()->json(['error' => 'Latitude and longitude are required'], 400);
       }
       
       // Fetch and return forecast data
       $forecast = $this->weatherService->getForecast($lat, $lon);
       
       return response()->json($forecast);
   }
}