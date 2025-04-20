"use client";

/**
 * Home Page Component
 * 
 * Main application entry point that renders the WeatherDashboard component.
 * Uses the Next.js "use client" directive to enable client-side functionality.
 * 
 * The component wraps the dashboard in a full-height container to ensure
 * proper layout rendering across different screen sizes.
 */
import WeatherDashboard from '../components/WeatherDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <WeatherDashboard />
    </main>
  );
}