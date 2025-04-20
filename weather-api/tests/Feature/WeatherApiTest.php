<?php

namespace Tests\Feature;

use Tests\TestCase;

class WeatherApiTest extends TestCase
{
    /**
     * Test that the geocoding API returns a 200 response when a valid query is provided
     */
    public function test_api_returns_successful_response(): void
    {
        $response = $this->getJson('/api/geocoding?q=Nairobi');

        $response->assertStatus(200);
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
