import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { useAuth } from "../providers/AuthProvider";
import ProfileScreen from "../screens/ProfileScreen";
import { headerStyle } from "../styles/Screens";

export type ProfileStackParamsList = {
  profile: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamsList>();
export default function ProfileStackNavigator() {
  const { signOut } = useAuth();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: headerStyle.container,
        headerTitleStyle: headerStyle.title,
        cardStyle: {
          flex: 1
        }
      }}>
      <ProfileStack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerRight: () => (
            <Button type="clear" title="Sign out" onPress={signOut} />
          )
        }}
      />
    </ProfileStack.Navigator>
  );
}
