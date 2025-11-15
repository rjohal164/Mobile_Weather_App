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
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
    opacity: 1,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default WeatherDescription;

