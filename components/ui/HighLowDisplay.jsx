/**
 * High Low Display Component
 *
 * Displays high and low temperature ranges in badge format.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { convertTemp, getTempSymbol } from "../../utils/weatherUtils";

// ============================================================================
// Component Definition
// ============================================================================

const HighLowDisplay = ({
  tempHigh,
  tempLow,
  tempScale,
  style,
  layout = "horizontal",
  gradientColors = ["rgba(135, 135, 135, 0.7)", "rgba(135, 135, 135, 0.7)", "rgba(135, 135, 135, 0.7)"],
}) => {
  if (tempHigh === undefined || tempLow === undefined) {
    return null;
  }

  return (
    <View
      style={[
        layout === "vertical" ? styles.verticalContainer : styles.horizontalContainer,
        style,
      ]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.badge, layout === "vertical" && { marginBottom: 4 }]}>
        <Text style={styles.label}>High</Text>
        <Text style={styles.temp}>
          {convertTemp(tempHigh, tempScale)}
          {getTempSymbol(tempScale)}
        </Text>
      </LinearGradient>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.badge}>
        <Text style={styles.label}>Low</Text>
        <Text style={styles.temp}>
          {convertTemp(tempLow, tempScale)}
          {getTempSymbol(tempScale)}
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  verticalContainer: {
    flexDirection: "column",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.9,
    fontWeight: "500",
    marginRight: 4,
  },
  temp: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
});

export default HighLowDisplay;

