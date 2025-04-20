# Weather App Backend

A Laravel-based API backend for the Weather App that integrates with OpenWeatherMap API.

## Technologies Used

- PHP 8.x
- Laravel (latest version)
- OpenWeatherMap API

## Features

- API-only implementation (no Blade views)
- OpenWeatherMap API integration
- Geocoding for city search
- Current weather data retrieval
- Multiple day forecast data
- Weather metrics processing (temperature, wind, humidity)

## Prerequisites

- PHP 8.x
- Composer
- OpenWeatherMap API key (free tier available)

## Setup Instructions

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd weather-app-backend
   ```
3. Install dependencies:
   ```bash
   composer install
   ```
4. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```
5. Generate an application key:
   ```bash
   php artisan key:generate
   ```
6. Add your OpenWeatherMap API key to the `.env` file:
   ```
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```
7. Configure CORS to allow requests from the frontend:
   ```
   # In .env
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   ```
8. Start the development server:
   ```bash
   php artisan serve
   ```
9. The API will be available at `http://localhost:8000/api`

## API Endpoints

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/api/weather/current` | GET | Get current weather | `lat`, `lon`, `units` (optional, default: metric) |
| `/api/weather/forecast` | GET | Get forecast data | `lat`, `lon`, `units` (optional, default: metric) |
| `/api/geocoding/search` | GET | Search for a city | `query` (city name) |


## Development Workflow

1. Make changes to the codebase
2. Run tests:
   ```bash
   php artisan test
   ```
3. Start the server and test the API with a tool like Postman or directly from the frontend

## Response Examples

### Current Weather Response

```json
{
  "temp": 22.5,
  "feels_like": 23.1,
  "temp_min": 21.8,
  "temp_max": 24.2,
  "pressure": 1012,
  "humidity": 65,
  "weather": {
    "main": "Clear",
    "description": "clear sky",
    "icon": "01d"
  },
  "wind": {
    "speed": 2.1,
    "deg": 60
  },
  "location": {
    "name": "London",
    "country": "GB"
  },
  "dt": 1679825600
}
```

### Forecast Response

```json
{
  "location": {
    "name": "London",
    "country": "GB"
  },
  "forecast": [
    {
      "dt": 1679911200,
      "date": "2023-03-27",
      "temp": {
        "day": 22.8,
        "min": 18.2,
        "max": 23.9
      },
      "weather": {
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03d"
      },
      "humidity": 58,
      "wind_speed": 3.2
    },
    {
      "dt": 1679997600,
      "date": "2023-03-28",
      "temp": {
        "day": 21.3,
        "min": 17.5,
        "max": 22.1
      },
      "weather": {
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
      },
      "humidity": 72,
      "wind_speed": 2.8
    },
    // Additional days...
  ]
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENWEATHERMAP_API_KEY` | Your OpenWeatherMap API key | Yes |
| `OPENWEATHERMAP_API_URL` | Base URL for OpenWeatherMap API | No (default provided) |
| `CORS_ALLOWED_ORIGINS` | Origins allowed to access the API | No (defaults to '*') |

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Successful request
- 400: Bad request (missing parameters)
- 404: City not found
- 429: Too many requests (API limit reached)
- 500: Server error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)