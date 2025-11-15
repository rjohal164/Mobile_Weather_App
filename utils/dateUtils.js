/**
 * Date and Time Utility Functions
 *
 * Comprehensive date formatting and time calculation utilities for weather data.
 * Handles timestamp conversion, date formatting, daylight calculations, and
 * time-of-day determination with proper localization and timezone handling.
 */

// ============================================================================
// Time Formatting
// ============================================================================

export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ============================================================================
// Date Formatting
// ============================================================================

export const formatDate = (timestamp, format = "short") => {
  const date = new Date(timestamp * 1000);

  switch (format) {
    case "long":
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    case "day":
      return date.toLocaleDateString("en-US", { weekday: "short" });
    case "date":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    default:
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
  }
};

export const getDayName = (timestamp, format = "short") => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: format === "long" ? "long" : "short",
  });
};

// ============================================================================
// Daylight Calculations
// ============================================================================

export const calculateDaylightDuration = (sunrise, sunset) => {
  const durationMs = (sunset - sunrise) * 1000;
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours,
    minutes,
    totalHours: hours + minutes / 60,
    formatted: `${hours}h ${minutes}m`,
  };
};

// ============================================================================
// Time of Day Detection
// ============================================================================

export const getTimeOfDay = (currentTime, sunrise, sunset) => {
  const current = new Date(currentTime * 1000);
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);

  const currentHour = current.getHours();
  const sunriseHour = sunriseTime.getHours();
  const sunsetHour = sunsetTime.getHours();

  if (currentHour < sunriseHour - 1) return "night";
  if (currentHour < sunriseHour + 1) return "dawn";
  if (currentHour < sunsetHour - 1) return "day";
  if (currentHour < sunsetHour + 1) return "dusk";
  return "night";
};

export const isDaylight = (currentTime, sunrise, sunset) => {
  return currentTime >= sunrise && currentTime <= sunset;
};

