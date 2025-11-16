/**
 * Hourly Forecast Card Component
 *
 * Displays hourly weather forecast with temperature and weather icon.
 */

// ============================================================================
// Imports
// ============================================================================

import React, { useRef } from "react";
import { View, Text, ImageBackground, StyleSheet, Animated, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatTime, getWeatherCategory } from "../../utils/weatherUtils";
import { getBackgroundImage } from "../../config/backgroundConfig";
import WeatherIcon from "../ui/WeatherIcon";
import TemperatureDisplay from "../ui/TemperatureDisplay";

// ============================================================================
// Component Definition
// ============================================================================

const HourlyForecastCard = ({ weatherData, tempScale, showTime = true }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  if (!weatherData) {
    return null;
  }

  const weatherInfo = weatherData.weather?.[0];
  const weatherCategory = getWeatherCategory(weatherInfo?.icon);
  const backgroundImage = getBackgroundImage(weatherCategory);

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

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={animatedStyle}>
        <ImageBackground
          source={backgroundImage}
          style={styles.container}
          imageStyle={styles.backgroundImage}
          resizeMode="cover">
      {showTime && (
        <LinearGradient
          colors={["rgba(135, 135, 135, 0.6)", "rgba(135, 135, 135, 0.6)", "rgba(135, 135, 135, 0.6)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.time}>
          <Text style={styles.timeText}>
            {new Date(weatherData.dt * 1000).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true,
            })}
          </Text>
        </LinearGradient>
      )}
      <WeatherIcon
        iconCode={weatherInfo?.icon}
        description={weatherInfo?.description}
        size="2x"
        style={styles.icon}
      />
      <LinearGradient
        colors={["rgba(135, 135, 135, 0.6)", "rgba(135, 135, 135, 0.6)", "rgba(135, 135, 135, 0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.tempContainer}>
        <TemperatureDisplay
          temp={weatherData.main.temp}
          tempScale={tempScale}
          size="lg"
          style={styles.temp}
        />
      </LinearGradient>
    </ImageBackground>
    </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 0,
    borderColor: "transparent",
    overflow: "hidden",
  },
  backgroundImage: {
    borderRadius: 12,
  },
  time: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    marginVertical: 8,
  },
  tempContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: "center",
  },
  temp: {
    // TemperatureDisplay styles remain unchanged
  },
});

export default HourlyForecastCard;

