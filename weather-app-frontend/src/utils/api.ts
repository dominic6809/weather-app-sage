/**
* Weather API Utilities
* 
* A collection of functions that interact with the Laravel backend API
* to fetch geocoding, current weather, and forecast data.
* 
* These utilities abstract the API communication details and handle
* error cases, providing a clean interface for the React components.
* The API base URL is configurable via environment variables.
*/
import { City, CurrentWeatherData, ForecastItem } from '../types';
import axios from 'axios';

// environment variable with fallback for local development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

/**
* Searches for cities based on a text query
* 
* @param query - The search string for finding cities
* @returns Array of matching city objects or empty array on error
*/
export async function searchCities(query: string): Promise<City[]> {
 try {
   const response = await axios.get(`${API_BASE_URL}/geocoding`, {
     params: { q: query }
   });
   
   return response.data;
 } catch (error) {
   console.error('Error searching cities:', error);
   return [];
 }
}

/**
* Fetches current weather conditions for a specific location
* 
* @param lat - Latitude coordinate
* @param lon - Longitude coordinate
* @returns Current weather data object or null if request fails
*/
export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherData | null> {
 try {
   const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);
   
   if (!response.ok) {
     throw new Error('Failed to fetch current weather');
   }
   
   return await response.json();
 } catch (error) {
   console.error('Error fetching current weather:', error);
   return null;
 }
}

/**
* Retrieves multi-day weather forecast for a specific location
* 
* @param lat - Latitude coordinate
* @param lon - Longitude coordinate
* @returns Array of forecast items or empty array if request fails
*/
export async function getForecast(lat: number, lon: number): Promise<ForecastItem[]> {
 try {
   const response = await fetch(`${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}`);
   
   if (!response.ok) {
     throw new Error('Failed to fetch forecast');
   }
   
   return await response.json();
 } catch (error) {
   console.error('Error fetching forecast:', error);
   return [];
 }
}