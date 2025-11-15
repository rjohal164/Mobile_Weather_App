import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useWeatherContext } from "../context/WeatherContext";
import { fetchMultipleWeatherData } from "../services/weatherApi";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import ForecastCard from "../components/cards/ForecastCard";
import WeatherDetailsSection from "../components/views/WeatherDetailsSection";
import SectionTitle from "../components/ui/SectionTitle";

export default function FavoritesScreen() {
  const { favorites, tempScale, isCityFavorite, toggleFavorite, selectCity } =
    useWeatherContext();
  const [favoriteWeatherData, setFavoriteWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavoriteWeather = async () => {
      if (favorites.length === 0) {
        setFavoriteWeatherData([]);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const results = await fetchMultipleWeatherData(favorites);
        setFavoriteWeatherData(results.filter((item) => !item.error));
      } catch (err) {
        setError(`Failed to fetch weather for favorite cities: ${err.message}`);
        console.error("Error fetching favorite weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteWeather();
  }, [favorites]);

  const handleCardClick = (weatherData, cityName) => {
    const cityData = favorites.find((fav) => fav.name === cityName);
    if (cityData) {
      selectCity(cityData);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={["#fef3f2", "#fdf2f8", "#fce7f3", "#fae8ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}>
        <View style={styles.container}>
          <WeatherDetailsSection>
            <SectionTitle title="Favorite Cities" />
            <LoadingSpinner size="large" color="#007AFF" />
          </WeatherDetailsSection>
        </View>
      </LinearGradient>
    );
  }

  if (favorites.length === 0) {
    return (
      <LinearGradient
        colors={["#fef3f2", "#fdf2f8", "#fce7f3", "#fae8ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}>
        <ScrollView style={styles.container}>
          <WeatherDetailsSection>
            <SectionTitle title="Favorite Cities" />
            <EmptyState
              icon="❤️"
              title="No favorite cities yet"
              message="Search for cities and add them to your favorites to see them here!"
            />
          </WeatherDetailsSection>
        </ScrollView>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={["#fef3f2", "#fdf2f8", "#fce7f3", "#fae8ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}>
        <View style={styles.container}>
          <WeatherDetailsSection>
            <SectionTitle title="Favorite Cities" />
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </WeatherDetailsSection>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#fef3f2", "#fdf2f8", "#fce7f3", "#fae8ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}>
      <ScrollView style={styles.container}>
        <WeatherDetailsSection>
          <SectionTitle title="Favorite Cities" />
          <View style={styles.favoritesList}>
            {favoriteWeatherData.map((item, index) => {
              if (item.error) return null;
              return (
                <View key={`${item.city.lat}-${item.city.lon}-${index}`} style={index > 0 && { marginTop: 12 }}>
                  <ForecastCard
                    weatherData={item.weather}
                    cityName={item.city.name}
                    tempScale={tempScale}
                    showExtended={false}
                    showFavorite={true}
                    isFavorited={isCityFavorite(item.city)}
                    onFavoriteClick={() => toggleFavorite(item.city)}
                    onClick={handleCardClick}
                  />
                </View>
              );
            })}
          </View>
        </WeatherDetailsSection>
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
  favoritesList: {
    paddingBottom: 12,
  },
  errorContainer: {
    backgroundColor: "#fee",
    borderWidth: 1,
    borderColor: "#fcc",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  errorText: {
    color: "#c00",
    fontSize: 16,
  },
});

