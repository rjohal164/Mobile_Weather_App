/**
 * Section Title Component
 *
 * Displays section titles with consistent styling.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { Text, StyleSheet } from "react-native";

// ============================================================================
// Component Definition
// ============================================================================

const SectionTitle = ({ title, style }) => {
  return <Text style={[styles.title, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
});

export default SectionTitle;

