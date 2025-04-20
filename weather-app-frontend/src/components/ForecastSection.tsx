/**
 * ForecastSection - Displays 3 days of weather forecast
 * 
 * Renders a collection of ForecastCard components in a responsive grid layout.
 * Takes an array of forecast data and the selected temperature unit as props,
 * passing them down to individual forecast cards. The grid adapts from 
 * single column on mobile to three columns on larger screens.
 */
import { ForecastItem } from '../types';
import ForecastCard from './ForecastCard';

interface ForecastSectionProps {
  forecast: ForecastItem[];
  unit: 'celsius' | 'fahrenheit';
}

export default function ForecastSection({ forecast, unit }: ForecastSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        3-Day Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forecast.map((item, index) => (
          <ForecastCard key={index} forecast={item} unit={unit} />
        ))}
      </div>
    </div>
  );
}