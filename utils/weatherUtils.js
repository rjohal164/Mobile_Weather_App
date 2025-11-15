/**
 * Weather Utility Functions
 *
 * Comprehensive collection of utility functions for weather data processing and formatting.
 * Handles temperature conversion, weather categorization, wind calculations, precipitation
 * analysis, and forecast data grouping with proper unit conversions and comfort level assessments.
 */

// ============================================================================
// Temperature Utilities
// ============================================================================

export const convertTemp = (temp, tempScale) => {
  if (tempScale === "fahrenheit") {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
};

export const getTempSymbol = (tempScale) =>
  tempScale === "fahrenheit" ? "°F" : "°C";

export const getWeatherIconUrl = (iconCode, size = "2x") =>
  `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;

// ============================================================================
// Weather Categorization
// ============================================================================

export const getWeatherCategory = (iconCode) => {
  if (!iconCode) return null;

  const code = iconCode.substring(0, 2);
  const isNight = iconCode.endsWith("n");

  switch (code) {
    case "01":
      return isNight ? "clear-night" : "clear-day";

    case "02":
    case "03":
      return isNight ? "clouds-night" : "clouds-day";

    case "04":
      return "overcast";

    case "09":
      return isNight ? "drizzle-night" : "drizzle-day";

    case "10":
      return isNight ? "rain-night" : "rain-day";

    case "11":
      return "thunderstorm";

    case "13":
      return isNight ? "snow-night" : "snow-day";

    case "50":
      return "fog-mist";

    default:
      return null;
  }
};

// ============================================================================
// Date Utilities
// ============================================================================

export { formatTime, formatDate, getDayName } from "./dateUtils";

// ============================================================================
// Wind Utilities
// ============================================================================

export const getWindDirection = (degrees) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getWindSpeedUnit = (tempScale) => {
  return tempScale === "fahrenheit" ? "mph" : "km/h";
};

export const convertWindSpeed = (speed, tempScale) => {
  if (tempScale === "fahrenheit") {
    return Math.round(speed * 2.237);
  }
  return Math.round(speed * 3.6);
};

export const getBeaufortScale = (speed) => {
  const kmh = speed * 3.6;

  if (kmh < 1)
    return { scale: 0, description: "Calm", effect: "Smoke rises vertically" };
  if (kmh < 6)
    return { scale: 1, description: "Light air", effect: "Smoke drifts" };
  if (kmh < 12)
    return {
      scale: 2,
      description: "Light breeze",
      effect: "Wind felt on face",
    };
  if (kmh < 20)
    return { scale: 3, description: "Gentle breeze", effect: "Leaves rustle" };
  if (kmh < 29)
    return {
      scale: 4,
      description: "Moderate breeze",
      effect: "Small branches move",
    };
  if (kmh < 39)
    return {
      scale: 5,
      description: "Fresh breeze",
      effect: "Small trees sway",
    };
  if (kmh < 50)
    return {
      scale: 6,
      description: "Strong breeze",
      effect: "Large branches move",
    };
  if (kmh < 62)
    return { scale: 7, description: "Near gale", effect: "Whole trees move" };
  if (kmh < 75)
    return { scale: 8, description: "Gale", effect: "Twigs break off" };
  if (kmh < 89)
    return {
      scale: 9,
      description: "Strong gale",
      effect: "Slight structural damage",
    };
  if (kmh < 103)
    return { scale: 10, description: "Storm", effect: "Trees uprooted" };
  if (kmh < 118)
    return {
      scale: 11,
      description: "Violent storm",
      effect: "Widespread damage",
    };
  return { scale: 12, description: "Hurricane", effect: "Devastating damage" };
};

// ============================================================================
// Precipitation Utilities
// ============================================================================

export const getPrecipitationChance = (weatherData) => {
  if (weatherData.rain && weatherData.rain["1h"]) {
    return Math.min(100, Math.round(weatherData.rain["1h"] * 10));
  }
  if (weatherData.snow && weatherData.snow["1h"]) {
    return Math.min(100, Math.round(weatherData.snow["1h"] * 10));
  }
  const humidity = weatherData.main?.humidity || 0;
  const weatherId = weatherData.weather?.[0]?.id || 0;

  if (weatherId >= 200 && weatherId < 700) {
    return Math.min(100, humidity + 20);
  }

  return Math.max(0, humidity - 30);
};

// ============================================================================
// Visibility Utilities
// ============================================================================

export const getVisibilityUnit = (tempScale) => {
  return tempScale === "fahrenheit" ? "mi" : "km";
};

export const convertVisibility = (meters, tempScale) => {
  if (tempScale === "fahrenheit") {
    return Math.round(meters * 0.000621371);
  }
  return Math.round(meters / 1000);
};

// ============================================================================
// Comfort Level Utilities
// ============================================================================

export const getComfortLevel = (humidity) => {
  if (humidity <= 30)
    return {
      level: "dry",
      description: "May cause skin irritation",
      color: "yellow",
    };
  if (humidity <= 60)
    return {
      level: "comfortable",
      description: "Ideal humidity level",
      color: "green",
    };
  if (humidity <= 80)
    return {
      level: "humid",
      description: "Slightly uncomfortable",
      color: "orange",
    };
  return {
    level: "very humid",
    description: "Quite uncomfortable",
    color: "red",
  };
};

// ============================================================================
// Pressure Utilities
// ============================================================================

export const getPressureTrend = (current, previous) => {
  if (!previous)
    return { direction: "steady", change: 0, description: "No previous data" };

  const change = current - previous;
  const absChange = Math.abs(change);

  let direction = "steady";
  let description = "Pressure steady";

  if (absChange > 2) {
    direction = change > 0 ? "rising" : "falling";
    description =
      change > 0 ? "Pressure rising rapidly" : "Pressure falling rapidly";
  } else if (absChange > 0.5) {
    direction = change > 0 ? "rising" : "falling";
    description = change > 0 ? "Pressure rising" : "Pressure falling";
  }

  return {
    direction,
    change: Math.round(change * 10) / 10,
    description,
    absChange: Math.round(absChange * 10) / 10,
  };
};

// ============================================================================
// Forecast Data Processing
// ============================================================================

export const groupByDay = (forecastList) => {
  const grouped = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!grouped[date]) {
      grouped[date] = {
        date: date,
        dayName: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temps: [],
        weather: [],
        minTemp: Infinity,
        maxTemp: -Infinity,
        humidity: [],
        windSpeed: [],
        pressure: [],
      };
    }

    grouped[date].temps.push(item.main.temp);
    grouped[date].weather.push(item.weather[0]);
    grouped[date].humidity.push(item.main.humidity);
    grouped[date].windSpeed.push(item.wind.speed);
    grouped[date].pressure.push(item.main.pressure);
    grouped[date].minTemp = Math.min(grouped[date].minTemp, item.main.temp);
    grouped[date].maxTemp = Math.max(grouped[date].maxTemp, item.main.temp);
  });

  return Object.values(grouped);
};

