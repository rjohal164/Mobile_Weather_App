/**
 * Weather Description Component
 *
 * Displays weather condition descriptions with optional capitalization.
 * Provides consistent text styling across forecast and current weather displays.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { Text, StyleSheet, View } from "react-native";

// ============================================================================
// Component Definition
// ============================================================================

const WeatherDescription = ({
  description,
  style,
  capitalize = true,
  showBackdrop = true,
}) => {
  if (!description) {
    return null;
  }

  const displayText = capitalize
    ? description.charAt(0).toUpperCase() + description.slice(1)
    : description;

  if (showBackdrop) {
    return (
      <View style={[styles.backdrop, style]}>
        <Text style={styles.text}>{displayText}</Text>
      </View>
    );
  }

  return <Text style={[styles.text, style]}>{displayText}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.95,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

export default WeatherDescription;

