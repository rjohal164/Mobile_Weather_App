/**
 * View Controls Component
 *
 * Allows switching between Current, 3-Day, and 5-Day forecast views.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useWeatherContext } from "../../context/WeatherContext";

// ============================================================================
// Component Definition
// ============================================================================

const ViewControls = () => {
  const { forecastView, changeForecastView } = useWeatherContext();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          forecastView === "current" && styles.activeButton,
        ]}
        onPress={() => changeForecastView("current")}>
        <Text
          style={[
            styles.buttonText,
            forecastView === "current" && styles.activeButtonText,
          ]}>
          Current
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonMargin,
          forecastView === "threeDay" && styles.activeButton,
        ]}
        onPress={() => changeForecastView("threeDay")}>
        <Text
          style={[
            styles.buttonText,
            forecastView === "threeDay" && styles.activeButtonText,
          ]}>
          3-Day
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonMargin,
          forecastView === "fiveDay" && styles.activeButton,
        ]}
        onPress={() => changeForecastView("fiveDay")}>
        <Text
          style={[
            styles.buttonText,
            forecastView === "fiveDay" && styles.activeButtonText,
          ]}>
          5-Day
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonMargin: {
    marginLeft: 8,
  },
  activeButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  activeButtonText: {
    color: "#fff",
  },
});

export default ViewControls;

