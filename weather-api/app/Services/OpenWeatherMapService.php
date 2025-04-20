<?php

/**
* OpenWeatherMap Service
* 
* Handles communication with the OpenWeatherMap API to retrieve weather data.
* Implements caching strategies to reduce API calls and improve performance.
* Processes and transforms raw API responses into application-friendly formats.
*/

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class OpenWeatherMapService
{
   protected $apiKey;
   protected $baseUrl;
   protected $geoUrl;

   /**
    * Initialize service with configuration values
    */
   public function __construct()
   {
       $this->apiKey = config('services.openweathermap.key');
       $this->baseUrl = config('services.openweathermap.base_url');
       $this->geoUrl = config('services.openweathermap.geo_url');
   }

   /**
    * Fetch current weather conditions with caching
    * 
    * @param float $lat Latitude coordinate
    * @param float $lon Longitude coordinate
    * @return array Weather data
    */
   public function getCurrentWeather($lat, $lon)
   {
       $cacheKey = "weather_{$lat}_{$lon}";
       
       // Cache results for one hour to reduce API calls
       return Cache::remember($cacheKey, 3600, function () use ($lat, $lon) {
           $response = Http::get("{$this->baseUrl}weather", [
               'lat' => $lat,
               'lon' => $lon,
               'appid' => $this->apiKey,
               'units' => 'metric',
           ]);
           
           return $response->json();
       });
   }

   /**
    * Fetch and process multi-day weather forecast with caching
    * 
    * @param float $lat Latitude coordinate
    * @param float $lon Longitude coordinate
    * @return array Processed forecast data
    */
   public function getForecast($lat, $lon)
   {
       $cacheKey = "forecast_{$lat}_{$lon}";
       
       // Cache results for one hour to reduce API calls
       return Cache::remember($cacheKey, 3600, function () use ($lat, $lon) {
           $response = Http::get("{$this->baseUrl}forecast", [
               'lat' => $lat,
               'lon' => $lon,
               'appid' => $this->apiKey,
               'units' => 'metric',
           ]);
           
           // Transform the raw forecast data into a simplified format
           $forecast = $response->json();
           return $this->processForecast($forecast);
       });
   }

   /**
    * Search for cities by name
    * 
    * @param string $query City name to search for
    * @return array List of matching cities
    */
   public function searchCity($query)
   {
       // No caching for city search as results may change
       $response = Http::baseUrl("{$this->geoUrl}direct", [
           'q' => $query,
           'limit' => 5, // Limit results to top 5 matches
           'appid' => $this->apiKey,
       ]);
       
       return $response->json();
   }

   /**
    * Process raw forecast data into a simplified 3-day format
    * 
    * @param array $forecastData Raw API response
    * @return array Processed forecast data
    */
   private function processForecast($forecastData)
   {
       // Extract one forecast entry per day, up to 3 days
       $processed = [];
       $currentDate = null;
       
       foreach ($forecastData['list'] as $item) {
           $date = date('Y-m-d', $item['dt']);
           
           // Only add the first forecast entry for each day
           if ($currentDate !== $date) {
               $currentDate = $date;
               
               if (count($processed) < 3) {
                   $processed[] = [
                       'date' => $date,
                       'temp' => $item['main']['temp'],
                       'feels_like' => $item['main']['feels_like'],
                       'humidity' => $item['main']['humidity'],
                       'wind_speed' => $item['wind']['speed'],
                       'description' => $item['weather'][0]['description'],
                       'icon' => $item['weather'][0]['icon'],
                   ];
               }
           }
       }
       
       return $processed;
   }
}