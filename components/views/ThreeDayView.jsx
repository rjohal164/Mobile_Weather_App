/**
 * Three Day View Component
 *
 * Displays 3-day weather forecast.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, StyleSheet } from "react-native";
import { useWeatherContext } from "../../context/WeatherContext";
import { groupByDay } from "../../utils/weatherUtils";
import ViewControls from "../layout/ViewControls";
import LoadingSpinner from "../LoadingSpinner";
import EmptyState from "../ui/EmptyState";
import ForecastCard from "../cards/ForecastCard";
import SectionTitle from "../ui/SectionTitle";
import WeatherDetailsSection from "./WeatherDetailsSection";

// ============================================================================
// Component Definition
// ============================================================================

const ThreeDayView = () => {
  const { parsedForecast, tempScale, isLoading } = useWeatherContext();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" color="#007AFF" />
      </View>
    );
  }

  if (!parsedForecast?.threeDay || parsedForecast.threeDay.length === 0) {
    return (
      <View style={styles.container}>
        <ViewControls />
        <WeatherDetailsSection>
          <SectionTitle title="3-Day Forecast" />
          <EmptyState
            icon="📅"
            title="No Forecast Data"
            message="No forecast data available"
          />
        </WeatherDetailsSection>
      </View>
    );
  }

  const threeDayData = groupByDay(parsedForecast.threeDay).slice(0, 3);

  return (
    <View style={styles.container}>
      <ViewControls />

      <WeatherDetailsSection>
        <SectionTitle title="3-Day Forecast" />
        <View style={styles.forecastList}>
          {threeDayData.map((item, index) => (
            <View key={`three-day-${item.date}-${index}`} style={index > 0 && { marginTop: 12 }}>
              <ForecastCard
                weatherData={{
                  ...item,
                  main: {
                    temp: item.temps[0],
                    temp_max: item.maxTemp,
                    temp_min: item.minTemp,
                    humidity: Math.round(
                      item.humidity.reduce((a, b) => a + b, 0) /
                        item.humidity.length
                    ),
                    pressure: Math.round(
                      item.pressure.reduce((a, b) => a + b, 0) /
                        item.pressure.length
                    ),
                  },
                  weather: [item.weather[0]],
                  wind: {
                    speed: Math.round(
                      item.windSpeed.reduce((a, b) => a + b, 0) /
                        item.windSpeed.length
                    ),
                  },
                }}
                date={item.date}
                tempScale={tempScale}
                showExtended={true}
              />
            </View>
          ))}
        </View>
      </WeatherDetailsSection>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  forecastList: {
    paddingBottom: 12,
  },
});

export default ThreeDayView;

