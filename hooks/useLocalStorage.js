/**
 * Local Storage Hook
 *
 * Custom React hook for managing AsyncStorage with JSON serialization and error handling.
 * Provides automatic persistence, cross-tab synchronization, and fallback to initial values.
 * Returns an array with stored value, setter function, and removal function.
 */

// ============================================================================
// Imports
// ============================================================================

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ============================================================================
// Hook Implementation
// ============================================================================

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load value from storage on mount
  useEffect(() => {
    const loadValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Error reading AsyncStorage key "${key}":`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadValue();
  }, [key]);

  const setValue = async (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting AsyncStorage key "${key}":`, error);
    }
  };

  const removeValue = async () => {
    try {
      setStoredValue(initialValue);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing AsyncStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue, isLoading];
};

export default useLocalStorage;

