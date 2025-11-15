/**
 * Current Weather Card Component
 *
 * Displays the primary current weather information with dynamic background based on conditions.
 * Shows temperature, feels-like temperature, high/low temps, weather description, and city name.
 * Handles loading states gracefully.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useWeatherContext } from "../../context/WeatherContext";
import { formatTime, getWeatherCategory, convertTemp, getTempSymbol } from "../../utils/weatherUtils";
import { getBackgroundImage } from "../../config/backgroundConfig";
import LoadingSpinner from "../LoadingSpinner";
import HighLowDisplay from "../ui/HighLowDisplay";
import TemperatureDisplay from "../ui/TemperatureDisplay";
import WeatherDescription from "../ui/WeatherDescription";
import WeatherIcon from "../ui/WeatherIcon";
import FavoriteToggle from "../ui/FavoriteToggle";

// ============================================================================
// Component Definition
// ============================================================================

const CurrentWeatherCard = ({ 
  style, 
  hideFavorite = false,
  weatherData: propWeatherData,
  cityData: propCityData,
}) => {
  const {
    selectedCity: contextSelectedCity,
    currentWeather: contextCurrentWeather,
    tempScale,
    isLoading: contextIsLoading,
    toggleFavorite,
    isCityFavorite,
  } = useWeatherContext();

  // Use props if provided, otherwise fall back to context (for backward compatibility)
  const selectedCity = propCityData !== undefined ? propCityData : contextSelectedCity;
  const currentWeather = propWeatherData !== undefined ? propWeatherData : contextCurrentWeather;
  // Only use context loading state if props are not provided
  const isLoading = propWeatherData === undefined && propCityData === undefined ? contextIsLoading : false;

  // ============================================================================
  // Loading State
  // ============================================================================

  if (isLoading || !currentWeather || !selectedCity) {
    const defaultBackground = getBackgroundImage(null);
    return (
      <ImageBackground
        source={defaultBackground}
        style={[styles.container, styles.loadingContainer, style]}
        imageStyle={styles.backgroundImage}
        resizeMode="cover">
        <LoadingSpinner size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading current weather...</Text>
      </ImageBackground>
    );
  }

  // ============================================================================
  // Data Processing
  // ============================================================================

  const {
    main: { temp, feels_like, temp_max, temp_min },
    weather: [weatherInfo],
    dt,
  } = currentWeather;

  const weatherCategory = getWeatherCategory(weatherInfo?.icon);
  const backgroundImage = getBackgroundImage(weatherCategory);

  // ============================================================================
  // Component Render
  // ============================================================================

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.container, style]}
      imageStyle={styles.backgroundImage}
      resizeMode="cover">
      {/* Gradient Overlay for better text readability */}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.1)", "transparent"]}
        style={styles.gradientOverlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.cityNameContainer}>
              <Text style={styles.cityName}>{selectedCity.name}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>Time: {formatTime(dt)}</Text>
            </View>
          </View>
          {!hideFavorite && (
            <FavoriteToggle
              isFavorited={isCityFavorite(selectedCity)}
              onToggle={() => toggleFavorite(selectedCity)}
            />
          )}
        </View>

        <View style={styles.mainContent}>
          <View style={styles.tempSection}>
            <View style={styles.tempContainer}>
              <View style={styles.tempDisplayContainer}>
                <Text style={styles.heroTemp}>
                  {Math.round(convertTemp(temp, tempScale))}
                  <Text style={styles.heroTempSymbol}>{getTempSymbol(tempScale)}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.detailsSection}>
              <WeatherDescription
                description={weatherInfo?.description}
                style={styles.description}
                capitalize={true}
                showBackdrop={true}
              />

              <View style={styles.feelsLikeContainer}>
                <Text style={styles.feelsLikeText}>
                  Feels like{" "}
                </Text>
                <TemperatureDisplay
                  temp={feels_like}
                  tempScale={tempScale}
                  size="sm"
                  inline={true}
                  style={styles.feelsLikeTemp}
                />
              </View>

              <View style={styles.highLowContainer}>
                <HighLowDisplay
                  tempHigh={temp_max}
                  tempLow={temp_min}
                  tempScale={tempScale}
                />
              </View>
            </View>
          </View>

          <View style={styles.iconSection}>
            <WeatherIcon
              iconCode={weatherInfo?.icon}
              description={weatherInfo?.description}
              size="4x"
              style={styles.weatherIcon}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    minHeight: 200,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  backgroundImage: {
    borderRadius: 14,
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 14,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  cityNameContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 8,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  cityName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  timeContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  timeText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    opacity: 0.95,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tempSection: {
    flex: 1,
  },
  tempContainer: {
    marginBottom: 16,
  },
  tempDisplayContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  heroTemp: {
    fontSize: 80,
    fontWeight: "300",
    color: "#fff",
    lineHeight: 96,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroTempSymbol: {
    fontSize: 48,
    fontWeight: "300",
  },
  detailsSection: {
    marginTop: 12,
  },
  description: {
    marginBottom: 10,
  },
  feelsLikeContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  feelsLikeText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    opacity: 0.95,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginRight: 4,
  },
  feelsLikeTemp: {
    marginLeft: 0,
  },
  highLowContainer: {
    marginTop: 8,
  },
  iconSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
});

export default CurrentWeatherCard;

