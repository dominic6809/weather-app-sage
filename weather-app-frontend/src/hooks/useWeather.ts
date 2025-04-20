/**
* useWeather Hook - A custom React hook that fetches and manages weather data based on geographic coordinates.
* 
* Handles concurrent fetching of current weather conditions and forecast data,
* with appropriate loading states and error handling.
* 
* The hook automatically refetches data when coordinates change and
* exposes both current weather and forecast information to consuming components.
*/
import { useState, useEffect } from 'react';
import { CurrentWeatherData, ForecastItem } from '../types';
import { getCurrentWeather, getForecast } from '../utils/api';

export function useWeather(lat: number | null, lon: number | null) {
 const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
 const [forecast, setForecast] = useState<ForecastItem[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   const fetchWeatherData = async () => {
     // Skip fetching if coordinates are not provided
     if (lat === null || lon === null) return;

     // Initialize loading state and clear previous errors
     setIsLoading(true);
     setError(null);

     try {
       // Fetch both data types concurrently for better performance
       const [weatherData, forecastData] = await Promise.all([
         getCurrentWeather(lat, lon),
         getForecast(lat, lon)
       ]);

       // Update state with fetched data
       setCurrentWeather(weatherData);
       setForecast(forecastData);
     } catch (err) {
       // Log detailed error for debugging but show simpler message to user
       console.error(err);
       setError('Failed to fetch weather data');
     } finally {
       // Always reset loading state when operation completes
       setIsLoading(false);
     }
   };

   fetchWeatherData();
 }, [lat, lon]); // Re-fetch when coordinates change

 return {
   currentWeather,
   forecast,
   isLoading,
   error
 };
}