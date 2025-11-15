import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  return (
    <LinearGradient
      colors={["#f3e8ff", "#ede9fe", "#e0e7ff", "#e0f2fe"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBackground}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Ionicons name="information-circle" size={60} color="#007AFF" />
        <Text style={styles.title}>About Weather App</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Developer Information</Text>
        <Text style={styles.text}>
          This weather app was built with React Native and Expo, following
          mobile development best practices.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#007AFF" style={{ marginRight: 12 }} />
          <Text style={styles.featureText}>Real-time weather data</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#007AFF" style={{ marginRight: 12 }} />
          <Text style={styles.featureText}>Hourly and daily forecasts</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#007AFF" style={{ marginRight: 12 }} />
          <Text style={styles.featureText}>Favorite cities</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={20} color="#007AFF" style={{ marginRight: 12 }} />
          <Text style={styles.featureText}>Temperature scale toggle</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technology</Text>
        <Text style={styles.text}>
          Built with React Native, Expo, and OpenWeatherMap API.
        </Text>
      </View>
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
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: "#666",
  },
});

