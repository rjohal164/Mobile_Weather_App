/**
 * Current View Component
 *
 * Displays current weather conditions with hourly forecast.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useWeatherContext } from "../../context/WeatherContext";
import ViewControls from "../layout/ViewControls";
import LoadingSpinner from "../LoadingSpinner";
import EmptyState from "../ui/EmptyState";
import SectionTitle from "../ui/SectionTitle";
import HourlyForecastCard from "../cards/HourlyForecastCard";
import WeatherDetailsSection from "./WeatherDetailsSection";

// ============================================================================
// Component Definition
// ============================================================================

const CurrentView = () => {
  const { currentWeather, tempScale, isLoading, parsedForecast } =
    useWeatherContext();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" color="#007AFF" />
      </View>
    );
  }

  if (!currentWeather) {
    return (
      <View style={styles.container}>
        <ViewControls />
        <WeatherDetailsSection>
          <EmptyState
            icon="🌤️"
            title="No Weather Data"
            message="Please search for a city to view current weather information."
          />
        </WeatherDetailsSection>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ViewControls />

      {parsedForecast?.current && parsedForecast.current.length > 0 && (
        <WeatherDetailsSection>
          <SectionTitle title="Hourly Forecast" />
          <FlatList
            data={parsedForecast.current}
            renderItem={({ item, index }) => (
              <View style={index > 0 && { marginLeft: 12 }}>
                <HourlyForecastCard
                  weatherData={item}
                  tempScale={tempScale}
                  showTime={true}
                />
              </View>
            )}
            keyExtractor={(item, index) => `hourly-${item.dt}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hourlyList}
            nestedScrollEnabled={true}
            scrollEnabled={true}
          />
        </WeatherDetailsSection>
      )}
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
  hourlyList: {
    paddingRight: 16,
  },
});

export default CurrentView;

