import { NavigationContainer } from "@react-navigation/native";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/ToastLayoutComponent";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import AuthProvider from "./src/providers/AuthProvider";
import { queryClient, queryClientPersister } from "./src/services/QueryService";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryClientPersister }}>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>

        <Toast config={toastConfig} />
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}
