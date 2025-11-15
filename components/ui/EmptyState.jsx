/**
 * Empty State Component
 *
 * Displays empty state messages with icons and text.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, StyleSheet } from "react-native";

// ============================================================================
// Component Definition
// ============================================================================

const EmptyState = ({ icon, title, message, style }) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      {title && <Text style={styles.title}>{title}</Text>}
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default EmptyState;

