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
      <View style={[styles.badge, layout === "vertical" && { marginBottom: 4 }]}>
        <Text style={styles.label}>High</Text>
        <Text style={styles.temp}>
          {convertTemp(tempHigh, tempScale)}
          {getTempSymbol(tempScale)}
        </Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.label}>Low</Text>
        <Text style={styles.temp}>
          {convertTemp(tempLow, tempScale)}
          {getTempSymbol(tempScale)}
        </Text>
      </View>
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
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.75,
  },
  temp: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
});

export default HighLowDisplay;

