import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WeatherProvider } from "./context/WeatherContext";
import RootNavigator from "./Navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <WeatherProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container} edges={["top"]}>
            <StatusBar style="auto" />
            <RootNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </WeatherProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});
