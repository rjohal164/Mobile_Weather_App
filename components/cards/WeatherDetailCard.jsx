/**
 * Weather Detail Card Component
 *
 * Displays a single weather metric in a compact card format with icon, label, and value.
 * Uses glassmorphism effect for modern, readable design over dynamic backgrounds.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// ============================================================================
// Component Definition
// ============================================================================

const WeatherDetailCard = ({ 
  icon, 
  label, 
  value, 
  unit, 
  color = "#fff",
  gradientColors = null 
}) => {
  const CardContent = (
    <>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value}
        {unit && <Text style={styles.unit}> {unit}</Text>}
      </Text>
    </>
  );

  // Use gradient if provided, otherwise use solid background
  if (gradientColors) {
    return (
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}>
        {CardContent}
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {CardContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    minHeight: 110,
    borderWidth: 0,
    borderColor: "transparent",
    overflow: "hidden",
  },
  iconContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  unit: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default WeatherDetailCard;

