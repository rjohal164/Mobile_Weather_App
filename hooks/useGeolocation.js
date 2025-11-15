import { useState, useEffect } from "react";
import * as Location from "expo-location";

/**
 * Custom hook for handling geolocation
 * 
 * Manages location permissions and fetching user's current location.
 * Returns location data, loading state, and error handling.
 * 
 * @returns {Object} { location, loading, error, requestLocation }
 */
export default function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Request location permission and get current location
   */
  const requestLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== "granted") {
        setError("Location permission denied. Please enable location access in settings.");
        setLoading(false);
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (err) {
      setError(`Failed to get location: ${err.message}`);
      console.error("Location error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { location, loading, error, requestLocation };
}

