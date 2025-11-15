import { View, Text, StyleSheet, ScrollView } from "react-native";
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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

