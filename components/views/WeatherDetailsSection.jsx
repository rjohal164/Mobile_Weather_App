/**
 * Weather Details Section Component
 *
 * Container component for weather detail sections with consistent styling.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, StyleSheet } from "react-native";

// ============================================================================
// Component Definition
// ============================================================================

const WeatherDetailsSection = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default WeatherDetailsSection;

