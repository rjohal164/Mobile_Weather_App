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
import { LinearGradient } from "expo-linear-gradient";

// ============================================================================
// Component Definition
// ============================================================================

const WeatherDescription = ({
  description,
  style,
  capitalize = true,
  showBackdrop = true,
  gradientColors = null,
  fontSize = 17,
  textAlign = "center",
  alignSelf = "center",
}) => {
  if (!description) {
    return null;
  }

  const displayText = capitalize
    ? description.charAt(0).toUpperCase() + description.slice(1)
    : description;

  if (showBackdrop) {
    const backdropStyle = [styles.backdrop, { alignSelf }, style];
    const textStyle = [styles.text, { fontSize, textAlign }];
    
    const BackdropContent = (
      <View style={backdropStyle}>
        <Text style={textStyle}>{displayText}</Text>
      </View>
    );

    if (gradientColors) {
      return (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={backdropStyle}>
          <Text style={textStyle}>{displayText}</Text>
        </LinearGradient>
      );
    }

    return BackdropContent;
  }

  return <Text style={[styles.text, { fontSize, textAlign }, style]}>{displayText}</Text>;
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
});

export default WeatherDescription;

