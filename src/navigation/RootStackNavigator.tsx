import { NavigatorScreenParams } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator
} from "@react-navigation/stack";
import React from "react";
import LoadingComponent from "../components/LoadingComponent";
import { useAuth } from "../providers/AuthProvider";
import { headerStyle } from "../styles/Screens";
import AuthenticationStackNavigator, {
  AuthenticationStackParamsList
} from "./AuthenticationStackNavigator";
import BottomTabMenuNavigator, {
  BottomTabNavigatorParamsList
} from "./BottomTabMenuNavigator";

export type RootStackParamsList = {
  root: NavigatorScreenParams<BottomTabNavigatorParamsList>;
  auth: NavigatorScreenParams<AuthenticationStackParamsList>;
};

const RootStack = createStackNavigator<RootStackParamsList>();
export default function RootStackNavigator() {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerTitleStyle: headerStyle.title,
        headerStyle: headerStyle.container,
        headerShown: false,
        cardStyle: {
          flex: 1
        }
      }}>
      {accessToken ? (
        <RootStack.Screen
          name="root"
          component={BottomTabMenuNavigator}
          options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
        />
      ) : (
        <RootStack.Screen
          name="auth"
          component={AuthenticationStackNavigator}
          options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
        />
      )}
    </RootStack.Navigator>
  );
}
