import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Banner, Banners, Extraction, Inventory, Login, Results } from "@screens/";
import { PlayerProvider } from "@context/PlayerContext";
import { colors } from "@/theme";

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.bg },
};

const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Banners" component={Banners} />
    <Stack.Screen name="Banner" component={Banner} />
    <Stack.Screen
      name="Extraction"
      component={Extraction}
      options={{ gestureEnabled: false, animation: "none" }}
    />
    <Stack.Screen name="Results" component={Results} />
    <Stack.Screen name="Inventory" component={Inventory} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <PlayerProvider>
        <NavigationContainer theme={navTheme}>
          <RootStack />
        </NavigationContainer>
        <StatusBar style="light" hidden />
      </PlayerProvider>
    </SafeAreaProvider>
  );
}
