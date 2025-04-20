/**
 * ForecastCard Component - Renders a single weather forecast card with responsive design and hover effects.
 * 
 * Displays date, weather icon, temperature (in selected unit), description, 
 * and additional weather metrics (wind speed and humidity).
 * 
 * The component uses Next.js Image for optimized icon loading and
 * supports both light and dark mode through Tailwind classes.
 */
import { ForecastItem } from '../types';
import { formatTemperature, formatForecastDate, getWeatherIconUrl } from '../utils/formatters';
import Image from 'next/image';

interface ForecastCardProps {
  forecast: ForecastItem;
  unit: 'celsius' | 'fahrenheit';
}

export default function ForecastCard({ forecast, unit }: ForecastCardProps) {
  return (
    <div className="card bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-md rounded-xl overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="card-body p-4 text-center">
        {/* Display formatted date from forecast data */}
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {formatForecastDate(forecast.date)}
        </h3>
        
        {/* Weather icon container with optimized image loading */}
        <div className="my-3 relative">
          <Image 
            src={getWeatherIconUrl(forecast.icon)} 
            alt={forecast.description}
            width={64}
            height={64}
            className="mx-auto"
          />
        </div>
        
        {/* Temperature display with unit conversion */}
        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          {formatTemperature(forecast.temp, unit)}
        </p>
        
        {/* Weather condition description */}
        <p className="text-sm capitalize text-gray-600 dark:text-gray-400 mt-1">
          {forecast.description}
        </p>
        
        {/* Additional weather metrics in a two-column grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <span className="block text-gray-500 dark:text-gray-400">Wind</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{forecast.wind_speed} m/s</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <span className="block text-gray-500 dark:text-gray-400">Humidity</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{forecast.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}