/**
 * Favorite Toggle Component
 *
 * Heart-shaped toggle button for adding/removing cities from favorites.
 * Shows filled heart when favorited, outlined when not.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ============================================================================
// Component Definition
// ============================================================================

const FavoriteToggle = ({ isFavorited, onToggle, style }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[
        styles.button,
        isFavorited ? styles.favorited : styles.notFavorited,
        style,
      ]}
      accessibilityLabel={
        isFavorited ? "Remove from favorites" : "Add to favorites"
      }>
      <Ionicons
        name={isFavorited ? "heart" : "heart-outline"}
        size={20}
        color="#fff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  favorited: {
    backgroundColor: "#14b8a6",
  },
  notFavorited: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
});

export default FavoriteToggle;

