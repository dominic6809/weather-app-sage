/**
* Weather Data Formatting Utilities
* 
* A collection of helper functions for formatting weather data in the UI.
* Includes temperature conversion, date formatting, and icon URL generation.
* These utilities ensure consistent formatting across the application
* and abstract away implementation details from UI components.
*/

/**
* Converts a temperature from Celsius to Fahrenheit
* 
* Uses standard conversion formula: (C × 9/5) + 32 = F
*/
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
 }
 
 /**
 * Formats a temperature with the appropriate unit symbol
 * 
 * Converts to Fahrenheit if needed and rounds to nearest integer
 */
 export function formatTemperature(temp: number, unit: 'celsius' | 'fahrenheit'): string {
  const temperature = unit === 'celsius' ? temp : celsiusToFahrenheit(temp);
  return `${Math.round(temperature)}°${unit === 'celsius' ? 'C' : 'F'}`;
 }
 
 /**
 * Formats a UNIX timestamp into a full date string
 * 
 * Example output: "Monday, April 20, 2025"
 */
 export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
 }
 
 /**
 * Formats a date string into a condensed format for forecast cards
 * 
 * Example output: "Mon 20"
 */
 export function formatForecastDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric'
  });
 }
 
 /**
 * Generates the URL for a weather condition icon
 * 
 * Uses OpenWeatherMap's icon service with double-size images
 */
 export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
 }