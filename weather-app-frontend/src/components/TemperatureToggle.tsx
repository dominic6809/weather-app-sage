/**
 * TemperatureToggle - Toggle switch for temperature unit preference
 * 
 * This component provides a toggle interface for users to switch between
 * Celsius and Fahrenheit temperature units. It visually indicates the currently selected unit with background highlighting.
 * 
 * The component is designed to be stateless - it receives the current unit state
 * and a toggle handler from its parent component, following a controlled component pattern.
 * Clicks are only processed when they would change the current state (clicking the
 * active unit does nothing).
 * 
 * Features:
 * - Visual feedback for the active temperature unit
 * - Smooth transition animations between states
 * - Optimized click handlers that prevent unnecessary re-renders
 * 
 * @param {('celsius'|'fahrenheit')} unit - The currently selected temperature unit
 * @param {() => void} onToggle - Callback function to toggle the temperature unit
 */

interface TemperatureToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onToggle: () => void;
}

export default function TemperatureToggle({ unit, onToggle }: TemperatureToggleProps) {
  return (
    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 inline-flex items-center">
      <button 
        className={`px-4 py-2 rounded-full transition-all ${
          unit === 'celsius' 
            ? 'bg-blue-600 text-white font-medium shadow-md' 
            : 'text-blue-600 dark:text-blue-300'
        }`}
        onClick={() => unit === 'fahrenheit' && onToggle()}
      >
        °C
      </button>
      <button 
        className={`px-4 py-2 rounded-full transition-all ${
          unit === 'fahrenheit' 
            ? 'bg-blue-600 text-white font-medium shadow-md' 
            : 'text-blue-600 dark:text-blue-300'
        }`}
        onClick={() => unit === 'celsius' && onToggle()}
      >
        °F
      </button>
    </div>
  );
}