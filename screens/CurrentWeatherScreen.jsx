import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useWeatherContext } from "../context/WeatherContext";
import { fetchWeatherByCoords } from "../services/weatherApi";
import useGeolocation from "../hooks/useGeolocation";
import CurrentWeatherCard from "../components/cards/CurrentWeatherCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CurrentWeatherScreen() {
  const { location, loading: locationLoading, error: locationError, requestLocation } = useGeolocation();
  const { tempScale } = useWeatherContext();
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  const [currentLocationCity, setCurrentLocationCity] = useState(null);

  // Request location on mount
  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch weather when location is available
  useEffect(() => {
    const fetchWeatherForLocation = async () => {
      if (!location) return;

      setWeatherLoading(true);
      setWeatherError(null);

      try {
        // Fetch current weather
        const weatherData = await fetchWeatherByCoords(location.latitude, location.longitude);
        
        // Create city object from weather data
        const cityData = {
          name: weatherData.name,
          lat: location.latitude,
          lon: location.longitude,
          country: weatherData.sys?.country || "",
          state: weatherData.sys?.country || "",
        };

        // Store in local state (don't update shared context)
        setCurrentLocationWeather(weatherData);
        setCurrentLocationCity(cityData);
      } catch (err) {
        setWeatherError(`Failed to fetch weather: ${err.message}`);
        console.error("Weather fetch error:", err);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeatherForLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleRefresh = () => {
    requestLocation();
  };

  // Loading state - location or weather
  if (locationLoading || weatherLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Current Weather</Text>
          <Ionicons name="location" size={24} color="#007AFF" />
        </View>
        <View style={styles.loadingContainer}>
          <LoadingSpinner size="large" color="#007AFF" />
          <Text style={styles.loadingText}>
            {locationLoading ? "Getting your location..." : "Loading weather..."}
          </Text>
        </View>
      </View>
    );
  }

  // Error state
  if (locationError || weatherError) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Current Weather</Text>
          <Ionicons name="location" size={24} color="#007AFF" />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
          <Text style={styles.errorTitle}>Unable to Get Location</Text>
          <Text style={styles.errorText}>
            {locationError || weatherError}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Success state - show weather
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Current Weather</Text>
          <Text style={styles.subtitle}>Based on your location</Text>
        </View>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContainer}>
        <CurrentWeatherCard 
          weatherData={currentLocationWeather}
          cityData={currentLocationCity}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  refreshButton: {
    padding: 8,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    minHeight: 400,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

