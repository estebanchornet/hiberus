import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import RootStackNavigator from "./src/navigation/RootStackNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
