<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;

class WeatherApiTest extends TestCase
{
    /**
     * Test that the geocoding API returns a 200 response when a valid query is provided
     */
    public function test_api_returns_successful_response(): void
    {
        // First, ensure the test knows what URL pattern to match
        // This assumes your config is set up with these values
        $geoUrl = config('services.openweathermap.geo_url', 'https://api.openweathermap.org/geo/1.0');
        
        // Use a wildcard pattern to match the URL regardless of trailing slash
        $urlPattern = rtrim($geoUrl, '/') . '/direct*';
        
        // Mock a successful response from the OpenWeatherMap API
        Http::fake([
            $urlPattern => Http::response([
                [
                    'name' => 'Nairobi',
                    'lat' => -1.286389,
                    'lon' => 36.817223,
                    'country' => 'KE',
                ]
            ], 200)
        ]);

        // Send a request to your API endpoint
        $response = $this->getJson('/api/geocoding?q=Nairobi');

        // Assert the response has a 200 status code
        $response->assertStatus(200);

        // Optionally, assert that the response has the expected structure
        $response->assertJsonStructure([
            '*' => [
                'name',
                'lat',
                'lon',
                'country',
            ]
        ]);
    }

    /**
     * Test that the geocoding API returns a 400 response when the query parameter is missing
     */
    public function test_api_returns_400_when_query_is_missing(): void
    {
        $response = $this->getJson('/api/geocoding');

        $response->assertStatus(400);
        $response->assertJson([
            'error' => 'Query parameter is required'
        ]);
    }
}