import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeStack from "./WelcomeStack";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="WelcomeStack"
    >
      <Stack.Screen name="WelcomeStack" component={WelcomeStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
}
