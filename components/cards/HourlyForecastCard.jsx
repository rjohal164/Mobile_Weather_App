/**
 * Hourly Forecast Card Component
 *
 * Displays hourly weather forecast with temperature and weather icon.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatTime, getWeatherCategory } from "../../utils/weatherUtils";
import { getBackgroundImage } from "../../config/backgroundConfig";
import WeatherIcon from "../ui/WeatherIcon";
import TemperatureDisplay from "../ui/TemperatureDisplay";

// ============================================================================
// Component Definition
// ============================================================================

const HourlyForecastCard = ({ weatherData, tempScale, showTime = true }) => {
  if (!weatherData) {
    return null;
  }

  const weatherInfo = weatherData.weather?.[0];
  const weatherCategory = getWeatherCategory(weatherInfo?.icon);
  const backgroundImage = getBackgroundImage(weatherCategory);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={styles.backgroundImage}
      resizeMode="cover">
      {showTime && (
        <LinearGradient
          colors={["rgba(135, 135, 135, 0.6)", "rgba(135, 135, 135, 0.6)", "rgba(135, 135, 135, 0.6)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.time}>
          <Text style={styles.timeText}>
            {new Date(weatherData.dt * 1000).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            })}
          </Text>
        </LinearGradient>
      )}
      <WeatherIcon
        iconCode={weatherInfo?.icon}
        description={weatherInfo?.description}
        size="2x"
        style={styles.icon}
      />
      <LinearGradient
        colors={["rgba(135, 135, 135, 0.6)", "rgba(135, 135, 135, 0.6)", "rgba(135, 135, 135, 0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.tempContainer}>
        <TemperatureDisplay
          temp={weatherData.main.temp}
          tempScale={tempScale}
          size="lg"
          style={styles.temp}
        />
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 0,
    borderColor: "transparent",
    overflow: "hidden",
  },
  backgroundImage: {
    borderRadius: 12,
  },
  time: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    marginVertical: 8,
  },
  tempContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: "center",
  },
  temp: {
    // TemperatureDisplay styles remain unchanged
  },
});

export default HourlyForecastCard;

