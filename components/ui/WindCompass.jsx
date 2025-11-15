/**
 * Wind Compass Component
 *
 * Visual compass component that displays wind direction with a rotating indicator.
 * Shows wind direction in degrees and cardinal direction.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ============================================================================
// Component Definition
// ============================================================================

const WindCompass = ({ windDegrees = 0, windDirection = "N", size = 120 }) => {
  // Convert degrees to rotation (0 degrees = North, which is -90 degrees in rotation)
  const rotation = windDegrees - 90;

  return (
    <View style={[styles.container, { width: size }]}>
      {/* Compass background circle */}
      <View style={[styles.compassCircle, { width: size, height: size, borderRadius: size / 2 }]}>
        {/* Cardinal directions */}
        <View style={styles.directionMarker}>
          <Text style={[styles.directionText, styles.north]}>N</Text>
        </View>
        <View style={[styles.directionMarker, styles.east]}>
          <Text style={styles.directionText}>E</Text>
        </View>
        <View style={[styles.directionMarker, styles.south]}>
          <Text style={styles.directionText}>S</Text>
        </View>
        <View style={[styles.directionMarker, styles.west]}>
          <Text style={styles.directionText}>W</Text>
        </View>

        {/* Wind direction indicator (arrow) */}
        <View
          style={[
            styles.arrowContainer,
            {
              transform: [{ rotate: `${rotation}deg` }],
            },
          ]}>
          <Ionicons name="arrow-up" size={size * 0.3} color="#ffffff" style={styles.arrow} />
        </View>

        {/* Center dot */}
        <View style={styles.centerDot} />
      </View>

      {/* Wind direction text below compass */}
      <View style={styles.directionLabel}>
        <Text style={styles.directionLabelText}>{windDirection}</Text>
        <Text style={styles.degreesText}>{Math.round(windDegrees)}°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: 140,
  },
  compassCircle: {
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  directionMarker: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  north: {
    top: 4,
  },
  east: {
    right: 4,
  },
  south: {
    bottom: 4,
  },
  west: {
    left: 4,
  },
  directionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  arrowContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  arrow: {
    marginTop: -8,
  },
  centerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#0e7490",
    position: "absolute",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  directionLabel: {
    marginTop: 8,
    alignItems: "center",
  },
  directionLabelText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 2,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  degreesText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default WindCompass;

