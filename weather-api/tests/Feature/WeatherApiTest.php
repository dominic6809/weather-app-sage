<?php

namespace Tests\Feature;

use Tests\TestCase;

class WeatherApiTest extends TestCase
{
    /**
     * Test that the geocoding API returns a 200 response when a valid query is provided.
     */
    public function test_api_returns_successful_response(): void
    {
        // Mock a valid response with an actual city
        $response = $this->getJson('/api/geocoding?q=Nairobi');
        
        // Assert the response has a 200 status code
        $response->assertStatus(200);
        
        // Optionally, assert that the response has the expected structure
        $response->assertJsonStructure([
            '*' => [
                'name', // City name
                'lat',  // Latitude
                'lon',  // Longitude
            ],
        ]);
    }

    /**
     * Test that the geocoding API returns a 400 response when the query parameter is missing.
     */
    public function test_api_returns_400_when_query_is_missing(): void
    {
        // Make a request without the 'q' query parameter
        $response = $this->getJson('/api/geocoding');

        // Assert the response has a 400 status code
        $response->assertStatus(400);

        // Assert the JSON structure for an error message
        $response->assertJson([
            'error' => 'Query parameter is required',
        ]);
    }
}

