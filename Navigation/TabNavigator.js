import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurrentWeatherScreen from "../screens/CurrentWeatherScreen";
import WeatherScreen from "../screens/WeatherScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AboutScreen from "../screens/AboutScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Current Weather") iconName = "location-outline";
          else if (route.name === "Weather") iconName = "partly-sunny-outline";
          else if (route.name === "Favorites") iconName = "heart-outline";
          else if (route.name === "About") iconName = "information-circle-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: "#f9f9f9",
        },
      })}
    >
      <Tab.Screen name="Current Weather" component={CurrentWeatherScreen} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}
