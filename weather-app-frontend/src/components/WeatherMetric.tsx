/**
 * WeatherMetric - Displays a single weather metric in a card format
 * 
 * This reusable component creates a standardized display for various weather metrics
 * like humidity, wind speed, UV index, etc. It accepts a title, value and an icon
 * to visually represent the metric type.
 * 
 * The component features:
 * - Consistent styling across all weather metrics
 * - Visual icon to help with quick recognition
 * - Responsive design with dark mode support
 * - Semi-transparent background with backdrop blur for a modern glass effect
 * 
 * @param {string} title - The name of the weather metric
 * @param {string} value - The formatted value with units
 * @param {React.ReactNode} icon - SVG or component to represent the metric
 */

interface WeatherMetricProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function WeatherMetric({ title, value, icon }: WeatherMetricProps) {
  return (
    <div className="card bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-md rounded-xl overflow-hidden h-full">
      <div className="card-body p-6">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
            {icon}
          </div>
          <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">{value}</span>
        </div>
      </div>
    </div>
  );
}