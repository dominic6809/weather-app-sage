<?php

/**
* Geocoding API Controller
*
* Handles city search requests from the frontend and communicates with the
* OpenWeatherMap service to retrieve location data. This controller acts as
* a proxy between the frontend application and the external weather API,
* validating requests and transforming responses as needed.
*/

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\OpenWeatherMapService;
use Illuminate\Http\Request;

class GeocodingController extends Controller
{
   protected $weatherService;

   /**
    * Inject the OpenWeatherMap service dependency
    */
   public function __construct(OpenWeatherMapService $weatherService)
   {
       $this->weatherService = $weatherService;
   }

   /**
    * Search for cities by name
    * 
    * @param Request $request The incoming HTTP request
    * @return \Illuminate\Http\JsonResponse List of matching cities or error response
    */
   public function search(Request $request)
   {
       $query = $request->query('q');
       
       // Validate the presence of query parameter before processing
       if (!$query) {
           return response()->json(['error' => 'Query parameter is required'], 400);
       }

       // Delegate the actual search to the weather service
       $cities = $this->weatherService->searchCity($query);

       // Handle empty results
       if (empty($cities)) {
           return response()->json(['error' => 'No cities found for the given query'], 404);
       }

       // Return results as JSON response
       return response()->json($cities);
   }
}
