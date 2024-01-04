import { NavigationContainer } from "@react-navigation/native";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/ToastLayoutComponent";
import AuthInterceptor from "./src/interceptors/AuthInterceptor";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import AuthProvider from "./src/providers/AuthProvider";
import FavoritesProvider from "./src/providers/FavoritesProvider";
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
        <AuthInterceptor>
          <FavoritesProvider>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                  <RootStackNavigator />
                </NavigationContainer>

                <StatusBar />
              </GestureHandlerRootView>
            </SafeAreaProvider>

            <Toast config={toastConfig} />
          </FavoritesProvider>
        </AuthInterceptor>
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}
