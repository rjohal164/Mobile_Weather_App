/**
 * Forecast Card Component
 *
 * Displays weather forecast information in a card format.
 */

// ============================================================================
// Imports
// ============================================================================

import React, { useRef } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Animated, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate, getDayName, getWeatherCategory } from "../../utils/weatherUtils";
import { getBackgroundImage } from "../../config/backgroundConfig";
import WeatherIcon from "../ui/WeatherIcon";
import TemperatureDisplay from "../ui/TemperatureDisplay";
import WeatherDescription from "../ui/WeatherDescription";
import FavoriteToggle from "../ui/FavoriteToggle";

// ============================================================================
// Component Definition
// ============================================================================

const ForecastCard = ({
  weatherData,
  cityName,
  date,
  tempScale,
  showExtended = false,
  showFavorite = false,
  isFavorited = false,
  onFavoriteClick,
  onClick,
}) => {
  if (!weatherData) {
    return null;
  }

  const weatherInfo = weatherData.weather?.[0];
  const weatherCategory = getWeatherCategory(weatherInfo?.icon);
  const backgroundImage = getBackgroundImage(weatherCategory);

  const tempMax = weatherData.main?.temp_max || weatherData.main?.temp;
  const tempMin = weatherData.main?.temp_min || weatherData.main?.temp;

  const getDateDisplay = () => {
    if (date) {
      if (typeof date === "string") {
        return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
      }
      return formatDate(date, showExtended ? "short" : "day");
    }
    if (weatherData.dt) {
      return getDayName(weatherData.dt, showExtended ? "long" : "short");
    }
    return "Today";
  };

  // ============================================================================
  // Hover Animation
  // ============================================================================

  const translateY = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(translateY, {
      toValue: -4,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ translateY }],
  };

  const CardContent = (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      imageStyle={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.header}>
        <LinearGradient
          colors={["rgba(135, 135, 135, 0.7)", "rgba(135, 135, 135, 0.7)", "rgba(135, 135, 135, 0.7)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dateText}>
          <Text style={styles.dateTextContent}>
            {cityName || getDateDisplay()}
          </Text>
        </LinearGradient>
        {showFavorite && (
          <View style={styles.favoriteContainer}>
            <FavoriteToggle
              isFavorited={isFavorited}
              onToggle={onFavoriteClick}
            />
          </View>
        )}
      </View>

      <View style={styles.iconContainer}>
        <WeatherIcon
          iconCode={weatherInfo?.icon}
          description={weatherInfo?.description}
          size="2x"
          style={styles.icon}
        />
      </View>

      <LinearGradient
        colors={["rgba(135, 135, 135, 0.7)", "rgba(135, 135, 135, 0.7)", "rgba(135, 135, 135, 0.7)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.tempContainer}>
        <View style={styles.tempRow}>
          <TemperatureDisplay
            temp={tempMax}
            tempScale={tempScale}
            size="sm"
            fontWeight="700"
          />
          <Text style={[styles.tempSeparator, { marginHorizontal: 4 }]}>/</Text>
          <TemperatureDisplay
            temp={tempMin}
            tempScale={tempScale}
            size="sm"
            fontWeight="700"
          />
        </View>
      </LinearGradient>

      <WeatherDescription
        description={weatherInfo?.description}
        style={styles.description}
        capitalize={true}
        showBackdrop={true}
        gradientColors={["rgba(135, 135, 135, 0.7)", "rgba(135, 135, 135, 0.7)", "rgba(135, 135, 135, 0.7)"]}
        fontSize={14}
      />
    </ImageBackground>
  );

  if (onClick) {
    return (
      <TouchableOpacity 
        onPress={() => onClick(weatherData, cityName)} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}>
        <Animated.View style={animatedStyle}>
          {CardContent}
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={animatedStyle}>
        {CardContent}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    minHeight: 160,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  backgroundImage: {
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  favoriteContainer: {
    position: "absolute",
    right: 0,
  },
  dateText: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "center",
  },
  dateTextContent: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  icon: {
    width: 80,
    height: 80,
  },
  tempContainer: {
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "center",
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  tempSeparator: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.75,
  },
  description: {
    textAlign: "center",
  },
});

export default ForecastCard;

