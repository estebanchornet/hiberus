import { NavigatorScreenParams } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator
} from "@react-navigation/stack";
import { headerStyle } from "../styles/Screens";
import { AuthenticationStackParamsList } from "./AuthenticationStackNavigator";
import BottomTabMenuNavigator, {
  BottomTabNavigatorParamsList
} from "./BottomTabMenuNavigator";

export type RootStackParamsList = {
  root: NavigatorScreenParams<BottomTabNavigatorParamsList>;
  auth: NavigatorScreenParams<AuthenticationStackParamsList>;
};

const RootStack = createStackNavigator<RootStackParamsList>();
export default function RootStackNavigator() {
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
      <RootStack.Screen
        name="root"
        component={BottomTabMenuNavigator}
        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
      />
    </RootStack.Navigator>
  );
}
