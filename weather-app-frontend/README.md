# Weather App Frontend

A NextJS application that provides a user-friendly interface for displaying weather information from the Weather App backend.

## Technologies Used

- NextJS
- TypeScript
- Tailwind CSS
- RippleUI components
- Fetch API for AJAX requests

## Features

- Responsive design
- City search functionality
- Toggle between Celsius and Fahrenheit
- Current weather display with icons
- Current weather description
- Date and location information
- 3-day forecast display
- Wind status information
- Humidity information

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Backend API running (see backend README)

## Setup Instructions

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd weather-app-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```
5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
6. The application will be available at `http://localhost:3000`


## Usage

1. Enter a city name in the search box
2. Click the search button or press Enter
3. View the current weather conditions for the selected city
4. Toggle between Celsius and Fahrenheit using the temperature unit switch
5. Scroll down to see the 3-day forecast, wind status, and humidity information

## API Integration

The frontend connects to the backend API with the following endpoints:

- **Get City Coordinates**: `/api/geocoding/search?query={cityName}`
- **Get Current Weather**: `/api/weather/current?lat={latitude}&lon={longitude}&units={units}`
- **Get Weather Forecast**: `/api/weather/forecast?lat={latitude}&lon={longitude}&units={units}`

## Building for Production

```bash
npm run build
# or
yarn build
```

Then, start the production server:

```bash
npm run dev
# or
yarn run dev
```

## Deployment

The NextJS application can be deployed to various platforms:

- **Vercel** (recommended): Connect your GitHub repository for automatic deployments
- **Netlify**: Similar to Vercel, with automatic deployments
- **Self-hosted**: Run the build command and deploy the resulting `.next` directory

Make sure to set the environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)