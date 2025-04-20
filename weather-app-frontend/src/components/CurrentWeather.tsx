/**
 * CurrentWeather Component - Displays the current weather information with a modern, responsive UI.
 * 
 * Features a gradient background card containing the weather icon, current temperature,
 * weather description, date, and location information.
 * 
 * The component supports temperature unit switching and is styled for both light and dark modes
 * using Tailwind CSS classes with a frosted glass effect (backdrop blur).
 */
import { CurrentWeatherData } from '../types';
import { formatTemperature, formatDate, getWeatherIconUrl } from '../utils/formatters';
import Image from 'next/image';

interface CurrentWeatherProps {
  weather: CurrentWeatherData;
  unit: 'celsius' | 'fahrenheit';
}

export default function CurrentWeather({ weather, unit }: CurrentWeatherProps) {
  return (
    <div className="card bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
      <div className="card-body p-6">
          {/* Weather icon with overlay effect */}
          <div className="mb-4 md:mb-0 order-1 md:order-2">
            <div className="relative">
              <Image 
                src={getWeatherIconUrl(weather.weather[0].icon)} 
                alt={weather.weather[0].description}
                width={140}
                height={140}
                className="drop-shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 dark:to-blue-900/5 rounded-full"></div>
            </div>
          </div>
          </div>
          
          <div className="text-center md:text-left order-2 md:order-1">
            {/* Main temperature display with unit conversion */}
            <h2 className="text-5xl md:text-6xl font-bold text-blue-800 dark:text-blue-300 mb-2">
              {formatTemperature(weather.main.temp, unit)}
            </h2>
            
            {/* Weather condition description */}
            <p className="text-xl capitalize text-gray-700 dark:text-gray-300 mb-4">
              {weather.weather[0].description}
            </p>
            
            {/* Date and location information with frosted glass effect */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 inline-block">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {formatDate(weather.dt)}
              </p>
              <div className="flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {weather.name}, {weather.sys.country}
                </p>
              </div>
            </div>
          </div>
        </div>
  );
}