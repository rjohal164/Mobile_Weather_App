/**
 * Search Dropdown Component
 *
 * Displays search results in a scrollable dropdown list.
 * Allows users to select a city from the search results.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Haptics from "expo-haptics";

// ============================================================================
// Component Definition
// ============================================================================

const SearchDropdown = ({ results, onSelect, isLoading }) => {
  const handleCitySelect = (item) => {
    try {
      Haptics.selectionAsync();
    } catch (error) {
      // Haptics not available, continue without feedback
    }
    onSelect(item);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      </View>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {results.map((item, index) => {
        const locationParts = [];
        if (item.name) locationParts.push(item.name);
        if (item.state) locationParts.push(item.state);
        if (item.country) locationParts.push(item.country);
        const locationString = locationParts.join(", ");

        return (
          <TouchableOpacity
            key={`${item.lat}-${item.lon}-${index}`}
            style={styles.item}
            onPress={() => handleCitySelect(item)}
            activeOpacity={0.7}>
            <Text style={styles.itemText}>{locationString}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  loadingContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
});

export default SearchDropdown;

