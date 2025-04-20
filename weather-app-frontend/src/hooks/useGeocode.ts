/**
* Custom hook for geocoding operations
* 
* Manages city search functionality with state management for search results,
* loading states, and error handling. Provides methods to search for cities
* by name and clear search results.
* 
* The hook encapsulates all API interaction logic and exposes a simple
* interface for components to perform geocoding operations.
*/
import { useState } from 'react';
import { City } from '../types';
import { searchCities } from '../utils/api';

export function useGeocode() {
 const [cities, setCities] = useState<City[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const searchCity = async (query: string) => {
   // Skip API call for empty queries and reset results
   if (!query.trim()) {
     setCities([]);
     return;
   }

   // Set loading state and clear any previous errors
   setIsLoading(true);
   setError(null);

   try {
     // Fetch and update city results from API
     const results = await searchCities(query);
     setCities(results);
   } catch (err) {
     // Handle errors with informative messages
     setError(`Failed to search cities: ${err instanceof Error ? err.message : String(err)}`);
     setCities([]);
   } finally {
     // Always reset loading state when operation completes
     setIsLoading(false);
   }
 };

 // Utility function to reset search results
 const clearCities = () => {
   setCities([]);
 };

 return {
   cities,
   isLoading,
   error,
   searchCity,
   clearCities
 };
}