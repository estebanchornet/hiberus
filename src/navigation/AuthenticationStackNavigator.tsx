import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { headerStyle } from "../styles/Screens";

export type AuthenticationStackParamsList = {
  login: undefined;
  register: undefined;
};

const AuthenticationStack =
  createStackNavigator<AuthenticationStackParamsList>();
export default function AuthenticationStackNavigator() {
  return (
    <AuthenticationStack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: headerStyle.container,
        headerTitleStyle: headerStyle.title,
        cardStyle: {
          flex: 1
        }
      }}>
      <AuthenticationStack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
          title: "Login"
        }}
      />
      <AuthenticationStack.Screen
        name="register"
        component={RegisterScreen}
        options={{
          title: "Register"
        }}
      />
    </AuthenticationStack.Navigator>
  );
}
