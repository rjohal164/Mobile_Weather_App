/**
 * Weather Icon Component
 *
 * Displays weather condition icons from OpenWeatherMap API with customizable sizing.
 * Fetches appropriate icon based on weather code with fallback alt text.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { Image, StyleSheet } from "react-native";
import { getWeatherIconUrl } from "../../utils/weatherUtils";

// ============================================================================
// Component Definition
// ============================================================================

const WeatherIcon = ({
  iconCode,
  description,
  size = "2x",
  style,
}) => {
  const iconUrl = getWeatherIconUrl(iconCode, size);

  if (!iconCode) return null;

  const sizeMap = {
    "1x": { width: 50, height: 50 },
    "2x": { width: 100, height: 100 },
    "4x": { width: 160, height: 160 },
  };

  return (
    <Image
      source={{ uri: iconUrl }}
      style={[
        sizeMap[size] || sizeMap["2x"],
        styles.icon,
        style,
      ]}
      resizeMode="contain"
      accessibilityLabel={description || "Weather icon"}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    tintColor: undefined, // Keep original colors
  },
});

export default WeatherIcon;

