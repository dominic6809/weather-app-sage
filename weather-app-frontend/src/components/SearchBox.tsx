/**
* SearchBox - Search interface for cities
* 
* Provides a search input for cities with dropdown results from the geocoding API.
* Allows users to search for cities by name and select from matching results.
* Features keyboard navigation support, loading states, and responsive design.
* 
* The component manages:
* - Search query state
* - City selection from results
* - Loading states during API calls
* - Keyboard accessibility for search submission
* - Clear search results after selection
* 
* @param {Function} onCitySelect - Callback function that receives the selected city
*/
import { useState } from 'react';
import { City } from '../types';
import { useGeocode } from '../hooks/useGeocode';

interface SearchBoxProps {
 onCitySelect: (city: City) => void;
}

export default function SearchBox({ onCitySelect }: SearchBoxProps) {
 const [query, setQuery] = useState('');
 const { cities, isLoading, searchCity, clearCities } = useGeocode();
 const [selectedCity, setSelectedCity] = useState<City | null>(null);

 const handleSearch = () => {
   if (query.trim()) {
     setSelectedCity(null);
     searchCity(query);
   }
 };

 const handleKeyPress = (e: React.KeyboardEvent) => {
   if (e.key === 'Enter') {
     handleSearch();
   }
 };

 const handleCitySelect = (city: City) => {
   setSelectedCity(city);
   onCitySelect(city);
   setQuery(city.name);
   clearCities();
 };

 return (
   <div className="relative">
     <div className="flex items-center gap-2 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-700 p-1 shadow-md">
       <input
         type="text"
         className="input flex-grow bg-transparent border-0 focus:outline-none text-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-400"
         placeholder="Search for a city..."
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         onKeyDown={handleKeyPress}
         aria-label="City search"
       />
       <button 
         className="btn bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all"
         onClick={handleSearch}
         disabled={isLoading}
         aria-label="Search"
       >
         {isLoading ? (
           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
         ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
         )}
       </button>
     </div>

     {cities.length > 0 && !selectedCity && (
       <div className="absolute z-10 mt-1 w-full">
         <ul className="menu bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-h-60 overflow-y-auto">
           {cities.map((city, index) => (
             <li key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
               <button 
                 className="px-4 py-3 text-left w-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                 onClick={() => handleCitySelect(city)}
               >
                 <div className="flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   <span className="font-medium">{city.name}, {city.state ? `${city.state}, ` : ''}{city.country}</span>
                 </div>
               </button>
             </li>
           ))}
         </ul>
       </div>
     )}
   </div>
 );
}