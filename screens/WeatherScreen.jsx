import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useWeatherContext } from "../context/WeatherContext";
import SearchBar from "../components/search/SearchBar";
import CurrentWeatherCard from "../components/cards/CurrentWeatherCard";
import CurrentView from "../components/views/CurrentView";
import ThreeDayView from "../components/views/ThreeDayView";
import FiveDayView from "../components/views/FiveDayView";
import TemperatureScaleToggle from "../components/ui/TemperatureScaleToggle";

export default function WeatherScreen() {
  const { forecastView } = useWeatherContext();

  const renderView = () => {
    switch (forecastView) {
      case "current":
        return <CurrentView />;
      case "threeDay":
        return <ThreeDayView />;
      case "fiveDay":
        return <FiveDayView />;
      default:
        return <CurrentView />;
    }
  };

  return (
    <LinearGradient
      colors={["#dbeafe", "#e0f2fe", "#e0e7ff", "#ede9fe"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Weather</Text>
            <TemperatureScaleToggle />
          </View>
          <SearchBar />
          <View style={styles.cardContainer}>
            <CurrentWeatherCard />
          </View>
          {renderView()}
        </ScrollView>
      </View>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  cardContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

