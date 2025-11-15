/**
 * Weather API Service
 *
 * Handles all external API communications with OpenWeatherMap services.
 * Provides functions for fetching current weather, forecasts, city search,
 * and batch weather data retrieval with proper error handling and URL construction.
 */

// ============================================================================
// Configuration
// ============================================================================

const API_CONFIG = {
  BASE_URL: "https://api.openweathermap.org",
  GEO_ENDPOINT: "/geo/1.0/direct",
  WEATHER_ENDPOINT: "/data/2.5/weather",
  FORECAST_ENDPOINT: "/data/2.5/forecast",
};

// Get API key from environment variables
// Expo SDK 50+ supports EXPO_PUBLIC_ prefix automatically
const getApiKey = () => {
  // Try to get API key from environment variables
  let apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
  
  // Fallback: try to get from expo-constants if available
  if (!apiKey) {
    try {
      const Constants = require('expo-constants').default;
      apiKey = Constants.expoConfig?.extra?.openWeatherApiKey;
    } catch (e) {
      // expo-constants not available, continue
    }
  }
  
  if (!apiKey || apiKey === "your_openweathermap_api_key_here") {
    throw new Error(
      "EXPO_PUBLIC_OPENWEATHER_API_KEY is not defined. Please:\n" +
      "1. Ensure .env file exists with: EXPO_PUBLIC_OPENWEATHER_API_KEY=your_key\n" +
      "2. Stop Expo server (Ctrl+C)\n" +
      "3. Restart with: npx expo start --clear"
    );
  }
  return apiKey;
};

// ============================================================================
// Helper Functions
// ============================================================================

const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  url.searchParams.append("appid", getApiKey());

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

// ============================================================================
// Weather API Functions
// ============================================================================

export const fetchWeatherByCoords = async (lat, lon) => {
  const url = buildApiUrl(API_CONFIG.WEATHER_ENDPOINT, {
    lat,
    lon,
    units: "metric",
  });

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Weather API Error ${response.status}: ${errorText}`);
  }

  return response.json();
};

export const fetchForecastByCoords = async (lat, lon) => {
  const url = buildApiUrl(API_CONFIG.FORECAST_ENDPOINT, {
    lat,
    lon,
    units: "metric",
  });

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Forecast API Error ${response.status}: ${errorText}`);
  }

  return response.json();
};

// ============================================================================
// Geocoding API Functions
// ============================================================================

export const searchCities = async (query, limit = 5) => {
  if (!query || query.length < 2) {
    return [];
  }

  const url = buildApiUrl(API_CONFIG.GEO_ENDPOINT, {
    q: query,
    limit,
  });

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Geocoding API Error ${response.status}: ${errorText}`);
  }

  return response.json();
};

// ============================================================================
// Batch Operations
// ============================================================================

export const fetchMultipleWeatherData = async (cities) => {
  if (!cities || cities.length === 0) {
    return [];
  }

  try {
    const promises = cities.map((city) =>
      fetchWeatherByCoords(city.lat, city.lon)
        .then((weather) => ({ city, weather }))
        .catch((error) => ({ city, error: error.message }))
    );

    return Promise.all(promises);
  } catch (error) {
    throw new Error(
      `Failed to fetch weather for multiple cities: ${error.message}`
    );
  }
};

