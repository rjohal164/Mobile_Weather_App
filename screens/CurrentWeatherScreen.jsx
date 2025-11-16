import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useWeatherContext } from "../context/WeatherContext";
import { fetchWeatherByCoords, fetchForecastByCoords } from "../services/weatherApi";
import useGeolocation from "../hooks/useGeolocation";
import CurrentWeatherCard from "../components/cards/CurrentWeatherCard";
import WeatherDetailCard from "../components/cards/WeatherDetailCard";
import HourlyForecastCard from "../components/cards/HourlyForecastCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SectionTitle from "../components/ui/SectionTitle";
import { 
  convertWindSpeed, 
  getWindSpeedUnit, 
  getWindDirection,
  convertVisibility,
  getVisibilityUnit,
  getComfortLevel,
} from "../utils/weatherUtils";
import { formatTime, calculateDaylightDuration } from "../utils/dateUtils";

export default function CurrentWeatherScreen() {
  const { location, loading: locationLoading, error: locationError, requestLocation } = useGeolocation();
  const { tempScale } = useWeatherContext();
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  const [currentLocationCity, setCurrentLocationCity] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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
        // Fetch current weather and forecast in parallel
        const [weatherData, forecast] = await Promise.all([
          fetchWeatherByCoords(location.latitude, location.longitude),
          fetchForecastByCoords(location.latitude, location.longitude),
        ]);
        
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
        setForecastData(forecast);
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

  const handleRefresh = async () => {
    setRefreshing(true);
    await requestLocation();
    setRefreshing(false);
  };

  // Get hourly forecast (next 8 hours)
  const hourlyForecast = forecastData?.list?.slice(0, 8) || [];

  // Prepare detail card data
  const getDetailCards = () => {
    if (!currentLocationWeather) return [];

    const { main, wind, sys, visibility, clouds } = currentLocationWeather;
    const windSpeed = convertWindSpeed(wind?.speed || 0, tempScale);
    const windUnit = getWindSpeedUnit(tempScale);
    const windDir = getWindDirection(wind?.deg || 0);
    const visibilityKm = convertVisibility(visibility || 0, tempScale);
    const visibilityUnit = getVisibilityUnit(tempScale);
    const comfort = getComfortLevel(main?.humidity || 0);
    const daylight = sys?.sunrise && sys?.sunset 
      ? calculateDaylightDuration(sys.sunrise, sys.sunset)
      : null;

    return [
      {
        icon: "water-outline",
        label: "Humidity",
        value: `${main?.humidity || 0}%`,
        color: "#fff",
        gradientColors: ["#3b82f6", "#2563eb", "#1d4ed8"], // Blue gradient
      },
      {
        icon: "speedometer-outline",
        label: "Pressure",
        value: `${main?.pressure || 0}`,
        unit: "hPa",
        color: "#fff",
        gradientColors: ["#8b5cf6", "#7c3aed", "#6d28d9"], // Purple gradient
      },
      {
        icon: "eye-outline",
        label: "Visibility",
        value: visibilityKm || 0,
        unit: visibilityUnit,
        color: "#fff",
        gradientColors: ["#14b8a6", "#0d9488", "#0f766e"], // Teal gradient
      },
      {
        icon: "cloud-outline",
        label: "Cloudiness",
        value: `${clouds?.all || 0}%`,
        color: "#fff",
        gradientColors: ["#64748b", "#475569", "#334155"], // Gray gradient
      },
      {
        icon: "sunny-outline",
        label: "Sunrise",
        value: sys?.sunrise ? formatTime(sys.sunrise) : "N/A",
        color: "#fff",
        gradientColors: ["#f59e0b", "#f97316", "#ea580c"], // Orange/yellow gradient
      },
      {
        icon: "moon-outline",
        label: "Sunset",
        value: sys?.sunset ? formatTime(sys.sunset) : "N/A",
        color: "#fff",
        gradientColors: ["#ec4899", "#db2777", "#be185d"], // Pink/purple gradient
      },
    ];
  };

  // Loading state - location or weather
  if (locationLoading || weatherLoading) {
    return (
      <LinearGradient
        colors={["#ccfbf1", "#d1fae5", "#dbeafe", "#e0f2fe"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Current Location</Text>
            <Ionicons name="location" size={24} color="#007AFF" />
          </View>
          <View style={styles.loadingContainer}>
            <LoadingSpinner size="large" color="#007AFF" />
            <Text style={styles.loadingText}>
              {locationLoading ? "Getting your location..." : "Loading weather..."}
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  }

  // Error state
  if (locationError || weatherError) {
    return (
      <LinearGradient
        colors={["#ccfbf1", "#d1fae5", "#dbeafe", "#e0f2fe"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Current Location</Text>
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
      </LinearGradient>
    );
  }

  // Success state - show weather
  const detailCards = getDetailCards();
  const windData = currentLocationWeather?.wind;

  return (
    <LinearGradient
      colors={["#ccfbf1", "#d1fae5", "#dbeafe", "#e0f2fe"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Current Location</Text>
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

      {/* Weather Detail Cards Grid */}
      {detailCards.length > 0 && (
        <View style={styles.detailsSection}>
          <SectionTitle title="Weather Details" />
          <View style={styles.detailsGrid}>
            {detailCards.map((card, index) => (
              <View 
                key={index} 
                style={[
                  styles.detailCardWrapper,
                  index % 2 === 0 && styles.detailCardLeft,
                  index % 2 === 1 && styles.detailCardRight,
                ]}>
                <WeatherDetailCard
                  icon={card.icon}
                  label={card.label}
                  value={card.value}
                  unit={card.unit}
                  color={card.color}
                  gradientColors={card.gradientColors}
                />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Wind Card with Direction */}
      {windData && (
        <View style={styles.detailsSection}>
          <SectionTitle title="Wind" />
          <LinearGradient
            colors={["#06b6d4", "#0891b2", "#0e7490"]} // Cyan gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.windCard}>
            <View style={styles.windSpeedContainer}>
              <Ionicons name="flag-outline" size={28} color="#fff" />
              <View style={styles.windSpeedText}>
                <Text style={styles.windLabel}>Wind Speed</Text>
                <Text style={styles.windValue}>
                  {convertWindSpeed(windData.speed || 0, tempScale)}{" "}
                  <Text style={styles.windUnit}>{getWindSpeedUnit(tempScale)}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.windDirectionContainer}>
              <Ionicons name="compass-outline" size={24} color="#fff" />
              <View style={styles.windDirectionText}>
                <Text style={styles.windDirectionLabel}>Direction</Text>
                <Text style={styles.windDirectionValue}>
                  {getWindDirection(windData.deg || 0)}
                  <Text style={styles.windDirectionDegrees}>
                    {" "}({Math.round(windData.deg || 0)}°)
                  </Text>
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Hourly Forecast */}
      {hourlyForecast.length > 0 && (
        <View style={styles.detailsSection}>
          <SectionTitle title="Hourly Forecast" />
          <FlatList
            data={hourlyForecast}
            renderItem={({ item, index }) => (
              <View style={index > 0 && styles.hourlyCardSpacing}>
                <HourlyForecastCard
                  weatherData={item}
                  tempScale={tempScale}
                  showTime={true}
                />
              </View>
            )}
            keyExtractor={(item, index) => `hourly-${item.dt}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hourlyList}
            nestedScrollEnabled={true}
          />
        </View>
      )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  detailsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "transparent",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  detailCardWrapper: {
    width: "50%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  detailCardLeft: {
    paddingRight: 6,
  },
  detailCardRight: {
    paddingLeft: 6,
  },
  windCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 12,
    borderRadius: 16,
    padding: 20,
    minHeight: 100,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
    width: "100%",
  },
  windSpeedContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  windSpeedText: {
    marginLeft: 12,
    flexShrink: 1,
  },
  windLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  windValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  windUnit: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  windDirectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
  },
  windDirectionText: {
    marginLeft: 12,
  },
  windDirectionLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  windDirectionValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  windDirectionDegrees: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  hourlyList: {
    paddingRight: 16,
    marginTop: 12,
  },
  hourlyCardSpacing: {
    marginLeft: 12,
  },
});

