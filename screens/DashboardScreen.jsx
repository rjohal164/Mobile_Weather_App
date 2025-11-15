import { View, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";

export default function DashboardScreen({ navigation }) {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout(); // clears user
    } catch (error) {
      Alert.alert(
        "Logout Error",
        "An error occurred during logout. Please try again."
      );
    }
  };

    const handleNavigate = async () => {
      // pass user data when navigating to Profile
    navigation.navigate("Profile", { userDetails: user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {user?.name || "User"} 👋</Text>
      <Text style={styles.subtitle}>Welcome to your dashboard</Text>
      <View style={{ maxHeight: 100 }}>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          loading={loading}
          disabled={loading}
        />
        <CustomButton
          title="Go to Profile"
          onPress={handleNavigate}
          loading={loading}
          disabled={loading}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 18, color: "#555", marginVertical: 10 },
});
