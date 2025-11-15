/**
 * Forecast Card Component
 *
 * Displays weather forecast information in a card format.
 */

// ============================================================================
// Imports
// ============================================================================

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { formatDate, getDayName, getWeatherCategory } from "../../utils/weatherUtils";
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
  const backgroundColor = weatherCategory ? "#4682B4" : "#708090";

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

  const CardContent = (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={styles.dateText}>
          {cityName || getDateDisplay()}
        </Text>
        {showFavorite && (
          <FavoriteToggle
            isFavorited={isFavorited}
            onToggle={onFavoriteClick}
          />
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

      <View style={styles.tempContainer}>
        <View style={styles.tempRow}>
          <TemperatureDisplay
            temp={tempMax}
            tempScale={tempScale}
            size="md"
          />
          <Text style={[styles.tempSeparator, { marginHorizontal: 4 }]}>/</Text>
          <TemperatureDisplay
            temp={tempMin}
            tempScale={tempScale}
            size="md"
          />
        </View>
      </View>

      <WeatherDescription
        description={weatherInfo?.description}
        style={styles.description}
        capitalize={true}
        showBackdrop={true}
      />
    </View>
  );

  if (onClick) {
    return (
      <TouchableOpacity onPress={() => onClick(weatherData, cityName)} activeOpacity={0.7}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    minHeight: 160,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  iconContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  icon: {
    width: 64,
    height: 64,
  },
  tempContainer: {
    alignItems: "center",
    marginVertical: 12,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  tempSeparator: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.75,
  },
  description: {
    textAlign: "center",
  },
});

export default ForecastCard;

