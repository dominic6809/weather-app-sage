/**
 * WeatherDashboard - Main component that orchestrates the weather application
 * 
 * This component serves as the container for all weather functionality including:
 * - City search and selection
 * - Temperature unit toggling (Celsius/Fahrenheit)
 * - Current weather conditions display
 * - Weather metrics visualization
 * - Multi-day forecast presentation
 */
import { useState } from 'react';
import { City } from '../types';
import { useWeather } from '../hooks/useWeather';
import SearchBox from './SearchBox';
import TemperatureToggle from './TemperatureToggle';
import CurrentWeather from './CurrentWeather';
import WeatherMetric from './WeatherMetric';
import ForecastSection from './ForecastSection';

export default function WeatherDashboard() {
  // Track the user selected city with its coordinates for API calls
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  
  // Custom hook that handles API calls and data transformation
  // Only triggers when latitude and longitude are available
  const { currentWeather, forecast, isLoading, error } = useWeather(
    selectedCity?.lat || null,
    selectedCity?.lon || null
  );

  /**
   * Updates the selected city when user makes a selection from the search results
   * This will trigger a new weather data fetch via the useWeather hook
   */
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  /**
   * Toggles between Celsius and Fahrenheit units
   */
  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Card container with glass-morphism effect for better readability */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300">
              Weather Dashboard
            </h1>
            <div className="mt-4 md:mt-0">
              <TemperatureToggle 
                unit={temperatureUnit} 
                onToggle={toggleTemperatureUnit} 
              />
            </div>
          </div>
          
          {/* Search interface that allows users to find and select cities */}
          <div className="mb-8">
            <SearchBox onCitySelect={handleCitySelect} />
          </div>

          {/* Loading indicator displayed while fetching weather data */}
          {isLoading && (
            <div className="flex justify-center my-10">
              <div className="loading loading-spinner loading-lg text-blue-600"></div>
            </div>
          )}

          {/* Error handling for API failures or connectivity issues */}
          {error && (
            <div className="alert alert-error bg-red-100 text-red-800 border-red-300 rounded-lg p-4 mt-4">
              <p>{error}</p>
            </div>
          )}

          {/* Weather content section - only displayed when data is available */}
          {currentWeather && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CurrentWeather 
                  weather={currentWeather} 
                  unit={temperatureUnit} 
                />
              </div>
              
              <div className="flex flex-col gap-6 justify-between">
                <WeatherMetric 
                  title="Wind Status" 
                  value={`${currentWeather.wind.speed} m/s`}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1111.5 9H2" />
                  </svg>}
                />
                <WeatherMetric 
                  title="Humidity" 
                  value={`${currentWeather.main.humidity}%`}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14.5a4.5 4.5 0 01-9 0M12 13a3 3 0 100-6 3 3 0 000 6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 01-9-9c0-3.77 2.51-8.82 9-12 6.49 3.18 9 8.23 9 12a9 9 0 01-9 9z" />
                  </svg>}
                />
              </div>
            </div>
          )}

          {/* Multi-day forecast section - only rendered when forecast data exists */}
          {forecast.length > 0 && (
            <div className="mt-8">
              <ForecastSection forecast={forecast} unit={temperatureUnit} />
            </div>
          )}

          {/* Empty state - displayed when no city is selected yet */}
          {!currentWeather && !isLoading && !error && (
            <div className="text-center my-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl mt-4 text-gray-600 dark:text-gray-300">Search for a city to see the weather forecast</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}