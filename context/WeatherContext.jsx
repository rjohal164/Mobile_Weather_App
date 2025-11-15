/**
 * Weather Context Provider
 *
 * Global state management for weather application data and user preferences.
 * Manages current weather, forecasts, temperature scale, and city selection.
 * Provides centralized API for weather data fetching and state updates across components.
 */

// ============================================================================
// Imports
// ============================================================================

import React, { createContext, useEffect, useState, useContext } from "react";
import {
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "../services/weatherApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { groupByDay } from "../utils/weatherUtils";

// ============================================================================
// Context Creation
// ============================================================================

const WeatherContext = createContext();

// ============================================================================
// Provider Component
// ============================================================================

export const WeatherProvider = ({ children }) => {
  const [forecast, setForecast] = useState([]);
  const [forecastError, setForecastError] = useState("");
  const [selectedCity, setSelectedCity, , isLoadingCity] = useLocalStorage("selectedCity", {
    name: "Vancouver",
    lat: 49.2608724,
    lon: -123.113952,
    country: "CA",
    state: "BC",
  });
  const [currentWeather, setCurrentWeather] = useState(null);
  const [favorites, setFavorites, , isLoadingFavorites] = useLocalStorage("favorites", []);
  const [tempScale, setTempScale, , isLoadingTempScale] = useLocalStorage("tempScale", "celsius");
  const [error, setError] = useState("");

  const [forecastView, setForecastView] = useState("current");
  const [parsedForecast, setParsedForecast] = useState({
    current: [],
    threeDay: [],
    fiveDay: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const favoritesMessage =
    favorites.length === 0
      ? "No cities favorited yet! Search and add some cities to see them here!"
      : null;

  // ============================================================================
  // Helper Functions
  // ============================================================================

  const parseForecastData = (forecastData) => {
    if (!forecastData?.list) return { current: [], threeDay: [], fiveDay: [] };

    const current = forecastData.list.slice(0, 8);
    const threeDay = forecastData.list.slice(0, 24);
    const fiveDay = groupByDay(forecastData.list);

    return { current, threeDay, fiveDay };
  };

  // ============================================================================
  // API Functions
  // ============================================================================

  const fetchForecast = async () => {
    if (!selectedCity?.lat || !selectedCity?.lon) return;

    try {
      setIsLoading(true);
      setForecastError("");

      const forecastData = await fetchForecastByCoords(
        selectedCity.lat,
        selectedCity.lon
      );

      setForecast(forecastData.list || []);
      const parsed = parseForecastData(forecastData);
      setParsedForecast(parsed);
    } catch (err) {
      setForecastError(`Failed to fetch forecast: ${err.message}`);
      console.error("Forecast fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================================
  // Effects
  // ============================================================================

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      if (!selectedCity?.lat || !selectedCity?.lon || isLoadingCity) return;

      try {
        setIsLoading(true);
        setError("");

        const weatherData = await fetchWeatherByCoords(
          selectedCity.lat,
          selectedCity.lon
        );
        setCurrentWeather(weatherData);
      } catch (err) {
        setError(`Failed to fetch current weather: ${err.message}`);
        console.error("Current weather fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentWeather();
  }, [selectedCity, isLoadingCity]);

  useEffect(() => {
    if (selectedCity?.lat && selectedCity?.lon && !isLoadingCity) {
      fetchForecast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, isLoadingCity]);

  // ============================================================================
  // Action Handlers
  // ============================================================================

  const selectCity = (city) => {
    setSelectedCity(city);
  };

  const setErrorMessage = (errorMsg) => {
    setError(errorMsg);
  };

  const changeTemperatureScale = (scale) => {
    if (scale === "celsius" || scale === "fahrenheit") {
      setTempScale(scale);
    }
  };

  const changeForecastView = (view) => {
    if (["current", "threeDay", "fiveDay", "hourly"].includes(view)) {
      setForecastView(view);
    }
  };

  // ============================================================================
  // Favorites Functions
  // ============================================================================

  const addToFavorites = (city) => {
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.lat === city.lat && fav.lon === city.lon
    );

    if (isAlreadyFavorite) {
      return { success: false, message: "City is already in your favorites!" };
    }

    if (favorites.length >= 5) {
      return {
        success: false,
        message:
          "You already have 5 favorites! Remove one before adding another.",
      };
    }

    const cityWithId = {
      ...city,
      id: city.id || `${city.lat}-${city.lon}-${city.name}`,
    };
    setFavorites([...favorites, cityWithId]);
    return { success: true, message: "City added to favorites!" };
  };

  const removeFromFavorites = (city) => {
    setFavorites(
      favorites.filter(
        (favorite) => !(favorite.lat === city.lat && favorite.lon === city.lon)
      )
    );
  };

  const isCityFavorite = (city) => {
    return favorites.some(
      (fav) => fav.lat === city.lat && fav.lon === city.lon
    );
  };

  const toggleFavorite = (city) => {
    if (isCityFavorite(city)) {
      removeFromFavorites(city);
      return { success: true, message: "City removed from favorites!" };
    } else {
      return addToFavorites(city);
    }
  };

  // ============================================================================
  // Context Provider
  // ============================================================================

  return (
    <WeatherContext.Provider
      value={{
        selectedCity,
        currentWeather,
        tempScale,
        isLoading,
        error,

        forecast,
        forecastError,
        forecastView,
        parsedForecast,

        favorites,
        favoritesMessage,

        selectCity,
        setErrorMessage,
        changeTemperatureScale,
        changeForecastView,

        addToFavorites,
        removeFromFavorites,
        isCityFavorite,
        toggleFavorite,

        fetchForecast,
      }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within WeatherProvider");
  }
  return context;
};

