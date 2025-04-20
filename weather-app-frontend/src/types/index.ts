/**
* Weather Application Type Definitions
* 
* This file contains interfaces for both external API responses
* and internal application state. These types ensure consistent data structures
* throughout the application and provide type safety when working with
* weather-related information.
*/

// Geographic location data for cities returned by geocoding API
export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string; 
 }
 
 // Response structure from current weather endpoint
 export interface CurrentWeatherData {
  main: {
    temp: number;     
    feels_like: number; // Perceived temperature
    humidity: number;   
  };
  weather: Array<{
    description: string; 
    icon: string;       
    main: string;       
  }>;
  wind: {
    speed: number;     
  };
  name: string;       
  dt: number;           // Unix timestamp of data calculation
  sys: {
    country: string;    // Country code
  };
 }
 
 // Normalized forecast data structure used in the application
 export interface ForecastItem {
  date: string;         
  temp: number;         
  feels_like: number;  
  humidity: number;     
  wind_speed: number;   
  description: string;  
  icon: string;        
 }
 
 // Application state types
 export interface TemperatureUnit {
  unit: 'celsius' | 'fahrenheit'; // User's preferred temperature unit
 }