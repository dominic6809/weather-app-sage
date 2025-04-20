<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use App\Services\OpenWeatherMapService;
use Mockery;

class WeatherApiTest extends TestCase
{
    /**
     * Test that the geocoding API returns a 200 response when a valid query is provided
     */
    public function test_api_returns_successful_response(): void
    {
        // Mock the OpenWeatherMapService completely
        // This avoids relying on HTTP mocking which can be tricky
        $this->mock(OpenWeatherMapService::class, function ($mock) {
            $mock->shouldReceive('searchCity')
                ->once()
                ->with('Nairobi')
                ->andReturn([
                    [
                        'name' => 'Nairobi',
                        'lat' => -1.286389,
                        'lon' => 36.817223,
                        'country' => 'KE',
                    ]
                ]);
        });

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