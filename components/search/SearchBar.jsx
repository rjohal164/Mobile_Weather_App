/**
 * Search Bar Component
 *
 * City search input with debounced API calls and dropdown results display.
 * Provides real-time city search with minimum 2-character requirement and 500ms debounce.
 * Handles city selection and integrates with WeatherContext for state management.
 */

// ============================================================================
// Imports
// ============================================================================

import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SearchDropdown from "./SearchDropdown";
import { searchCities } from "../../services/weatherApi";
import { useWeatherContext } from "../../context/WeatherContext";

// ============================================================================
// Component Definition
// ============================================================================

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { selectCity } = useWeatherContext();

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleCitySelect = (city) => {
    selectCity(city);
    setSearchResults([]);
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  const handleInputChange = (text) => {
    setSearchTerm(text);
  };

  // ============================================================================
  // Effects
  // ============================================================================

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm.length >= 2) {
        setIsLoading(true);
        try {
          const results = await searchCities(debouncedSearchTerm, 5);
          setSearchResults(results);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else if (debouncedSearchTerm.length === 0) {
        setSearchResults([]);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  // ============================================================================
  // Component Render
  // ============================================================================

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a city (type 2+ characters)"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={handleInputChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchResults.length > 0 && (
          <SearchDropdown
            results={searchResults}
            onSelect={handleCitySelect}
            isLoading={isLoading}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    position: "relative",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    minHeight: 44,
  },
});

export default SearchBar;

