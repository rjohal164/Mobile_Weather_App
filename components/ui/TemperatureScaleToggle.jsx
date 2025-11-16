/**
 * Temperature Scale Toggle Component
 *
 * Toggle button for switching between Celsius and Fahrenheit.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useWeatherContext } from "../../context/WeatherContext";
import * as Haptics from "expo-haptics";

// ============================================================================
// Component Definition
// ============================================================================

const TemperatureScaleToggle = ({ style }) => {
  const { tempScale, changeTemperatureScale } = useWeatherContext();

  const handleCelsiusPress = () => {
    try {
      Haptics.selectionAsync();
    } catch (error) {
      // Haptics not available, continue without feedback
    }
    changeTemperatureScale("celsius");
  };

  const handleFahrenheitPress = () => {
    try {
      Haptics.selectionAsync();
    } catch (error) {
      // Haptics not available, continue without feedback
    }
    changeTemperatureScale("fahrenheit");
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          tempScale === "celsius" && styles.activeButton,
        ]}
        onPress={handleCelsiusPress}>
        <Text
          style={[
            styles.buttonText,
            tempScale === "celsius" && styles.activeButtonText,
          ]}>
          °C
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          tempScale === "fahrenheit" && styles.activeButton,
        ]}
        onPress={handleFahrenheitPress}>
        <Text
          style={[
            styles.buttonText,
            tempScale === "fahrenheit" && styles.activeButtonText,
          ]}>
          °F
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 2,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  activeButtonText: {
    color: "#fff",
  },
});

export default TemperatureScaleToggle;

