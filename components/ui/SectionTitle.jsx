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
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
    letterSpacing: 0.3,
  },
});

export default SectionTitle;

