<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
// use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class WeatherApiTest extends TestCase
{
    public function test_api_returns_successful_response(): void
    {
        $response = $this->getJson('/api/geocoding'); 
        $response->assertStatus(200);
    }
}
