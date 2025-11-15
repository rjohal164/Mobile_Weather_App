import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  BackHandler,
  ToastAndroid,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { useActionSheet } from "@expo/react-native-action-sheet";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

export default function PlatformDemoScreen() {
  const { width, height } = useWindowDimensions();
  const { landscape } = useDeviceOrientation();
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();
  const {user} = useAuth();

  const orientation = landscape ? "Landscape" : "Portrait";

  //  Android BackHandler demo
  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          Alert.alert("Hold on!", "Do you really want to exit the app?", [
            { text: "Cancel", style: "cancel" },
            { text: "Exit", onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        }
      );
      return () => backHandler.remove();
    }
  }, []);

  // Toast example (for android)
  const showToast = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show("Hello from Android Toast!", ToastAndroid.SHORT);
    } else {
      Alert.alert("iOS Toast", "This is a simulated toast!");
    }
  };

  // iOS ActionSheet that navigates to screens
  const openActionSheet = () => {
    const options = ["Cancel", "Go to Profile", "Go to Settings"];
    const cancelButtonIndex = 0;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Choose where to go",
        message: "Select a screen to navigate to",
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          navigation.navigate("Profile",{user});
        } else if (buttonIndex === 2) {
          navigation.navigate("Settings");
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platform Demo</Text>

      <Text style={styles.info}>Platform: {Platform.OS}</Text>
      <Text style={styles.info}>Orientation: {orientation}</Text>
      <Text style={styles.info}>
        Window: {width.toFixed(0)} x {height.toFixed(0)}
      </Text>

      <View style={styles.buttonContainer}>
        <CustomButton title="Show Action Sheet" onPress={openActionSheet} />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton title="Show Toast" onPress={showToast} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
