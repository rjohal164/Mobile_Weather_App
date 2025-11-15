import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // Navigate to AppStack which contains the tabs
    // Get parent navigator (RootNavigator) to navigate between stacks
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate("AppStack");
    } else {
      // Fallback: try direct navigation
      navigation.navigate("AppStack");
    }
  };

  return (
    <LinearGradient
      colors={["#e0f2fe", "#f0f9ff", "#faf5ff", "#fef3f2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="partly-sunny" size={80} color="#007AFF" />
        <Text style={styles.title}>Welcome to Weather App</Text>
        <Text style={styles.subtitle}>Your weather companion</Text>
        <Text style={styles.description}>
          Get real-time weather updates, detailed forecasts, and save your
          favorite cities for quick access.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonIcon: {
    marginLeft: 4,
  },
});

