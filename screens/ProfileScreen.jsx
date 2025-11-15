import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";

export default function ProfileScreen({ route, navigation }) {
  const {user} = useAuth();
  const { userDetails } = route.params || {}; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.info}>Name: {user.name || userDetails.name}</Text> 
      <Text style={styles.info}>Email: {user.email || userDetails.email}</Text>
      <CustomButton title="Go to Settings" onPress={() => navigation.navigate("Settings")} />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});
