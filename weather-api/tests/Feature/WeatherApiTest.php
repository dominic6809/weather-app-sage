<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;

class WeatherApiTest extends TestCase
{
    /**
     * Test that the geocoding API returns a 200 response when a valid query is provided
     */
    public function test_api_returns_successful_response(): void
    {
        // Mock a successful response from the OpenWeatherMap API
        Http::fake([
            'api.openweathermap.org/geo/1.0/direct' => Http::response([
                [
                    'name' => 'Nairobi',
                    'lat' => -1.286389,
                    'lon' => 36.817223,
                    'country' => 'KE',
                ]
            ], 200)
        ]);

        // Send a request to your API endpoint
        $response = $this->get('/api/geocoding?q=Nairobi');  // Use `get` instead of `getJson`

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
