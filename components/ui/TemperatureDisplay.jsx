/**
 * Temperature Display Component
 *
 * Flexible temperature display with scale conversion and responsive sizing.
 * Supports multiple size presets with proper symbol scaling.
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

const TemperatureDisplay = ({
  temp,
  tempScale,
  showSymbol = true,
  size = "sm",
  style,
  containerStyle,
  inline = false,
  fontWeight = "300",
}) => {
  const convertedTemp = convertTemp(temp, tempScale);
  const symbol = getTempSymbol(tempScale);

  const sizeStyles = {
    xs: { fontSize: 12 },
    sm: { fontSize: 14 },
    md: { fontSize: 16 },
    lg: { fontSize: 18 },
    xl: { fontSize: 20 },
    "2xl": { fontSize: 24 },
    "3xl": { fontSize: 30 },
    "4xl": { fontSize: 36 },
    "5xl": { fontSize: 48 },
  };

  const symbolSizeStyles = {
    xs: { fontSize: 10 },
    sm: { fontSize: 12 },
    md: { fontSize: 14 },
    lg: { fontSize: 16 },
    xl: { fontSize: 18 },
    "2xl": { fontSize: 20 },
    "3xl": { fontSize: 24 },
    "4xl": { fontSize: 28 },
    "5xl": { fontSize: 32 },
  };

  const displayElement = (
    <View
      style={[
        inline ? styles.inlineContainer : styles.container,
        style,
      ]}>
      <Text style={[sizeStyles[size], styles.tempText, { fontWeight }]}>
        {convertedTemp}
      </Text>
      {showSymbol && (
        <Text style={[symbolSizeStyles[size], styles.symbolText, { fontWeight }]}>
          {symbol}
        </Text>
      )}
    </View>
  );

  if (containerStyle) {
    return <View style={containerStyle}>{displayElement}</View>;
  }

  return displayElement;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  tempText: {
    fontWeight: "300",
    color: "#fff",
  },
  symbolText: {
    fontWeight: "300",
    color: "#fff",
  },
});

export default TemperatureDisplay;

