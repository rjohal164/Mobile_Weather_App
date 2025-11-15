/**
 * Hourly Forecast Card Component
 *
 * Displays hourly weather forecast with temperature and weather icon.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatTime, getWeatherCategory } from "../../utils/weatherUtils";
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
  const backgroundColor = weatherCategory ? "#4682B4" : "#708090";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showTime && (
        <Text style={styles.time}>
          {new Date(weatherData.dt * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          })}
        </Text>
      )}
      <WeatherIcon
        iconCode={weatherInfo?.icon}
        description={weatherInfo?.description}
        size="2x"
        style={styles.icon}
      />
      <TemperatureDisplay
        temp={weatherData.main.temp}
        tempScale={tempScale}
        size="lg"
        style={styles.temp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  time: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  icon: {
    marginVertical: 8,
  },
  temp: {
    marginTop: 4,
  },
});

export default HourlyForecastCard;

