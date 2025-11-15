/**
 * Five Day View Component
 *
 * Displays 5-day weather forecast.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, StyleSheet } from "react-native";
import { useWeatherContext } from "../../context/WeatherContext";
import ViewControls from "../layout/ViewControls";
import LoadingSpinner from "../LoadingSpinner";
import EmptyState from "../ui/EmptyState";
import ForecastCard from "../cards/ForecastCard";
import SectionTitle from "../ui/SectionTitle";
import WeatherDetailsSection from "./WeatherDetailsSection";

// ============================================================================
// Component Definition
// ============================================================================

const FiveDayView = () => {
  const { parsedForecast, tempScale, isLoading } = useWeatherContext();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" color="#007AFF" />
      </View>
    );
  }

  if (!parsedForecast?.fiveDay || parsedForecast.fiveDay.length === 0) {
    return (
      <View style={styles.container}>
        <ViewControls />
        <WeatherDetailsSection>
          <SectionTitle title="5-Day Forecast" />
          <EmptyState
            icon="📅"
            title="No Forecast Data"
            message="No forecast data available"
          />
        </WeatherDetailsSection>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ViewControls />

      <WeatherDetailsSection>
        <SectionTitle title="5-Day Forecast" />
        <View style={styles.forecastList}>
          {parsedForecast.fiveDay.map((item, index) => (
            <View key={`five-day-${item.date}-${index}`} style={index > 0 && { marginTop: 12 }}>
              <ForecastCard
                weatherData={{
                  ...item,
                  main: {
                    temp:
                      item.temps && item.temps.length > 0 ? item.temps[0] : 0,
                    temp_max: isFinite(item.maxTemp) ? item.maxTemp : 0,
                    temp_min: isFinite(item.minTemp) ? item.minTemp : 0,
                    humidity:
                      item.humidity && item.humidity.length > 0
                        ? Math.round(
                            item.humidity.reduce((a, b) => a + b, 0) /
                              item.humidity.length
                          )
                        : 0,
                    pressure:
                      item.pressure && item.pressure.length > 0
                        ? Math.round(
                            item.pressure.reduce((a, b) => a + b, 0) /
                              item.pressure.length
                          )
                        : 0,
                  },
                  weather:
                    item.weather && item.weather.length > 0
                      ? [item.weather[0]]
                      : [
                          {
                            main: "Clear",
                            description: "clear sky",
                            icon: "01d",
                          },
                        ],
                  wind: {
                    speed:
                      item.windSpeed && item.windSpeed.length > 0
                        ? Math.round(
                            item.windSpeed.reduce((a, b) => a + b, 0) /
                              item.windSpeed.length
                          )
                        : 0,
                  },
                }}
                date={item.date}
                tempScale={tempScale}
                showExtended={false}
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

export default FiveDayView;

