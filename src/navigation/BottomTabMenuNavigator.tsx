import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import React from "react";
import { Platform, View } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../styles/Colors";
import { cornerRadius, iconSizes, spacings } from "../styles/Constants";
import { fontFamilies, fontSizes } from "../styles/Fonts";
import { tabBarStyle } from "../styles/Screens";
import HomeStackNavigator, { HomeStackParamsList } from "./HomeStackNavigator";
import ProfileStackNavigator, {
  ProfileStackParamsList
} from "./ProfileStackNavigator";

export type BottomTabNavigatorParamsList = {
  homeStack: NavigatorScreenParams<HomeStackParamsList>;
  profileStack: NavigatorScreenParams<ProfileStackParamsList>;
};

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamsList>();
export default function BottomTabMenuNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="homeStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarStyle.container,
        tabBarHideOnKeyboard: Platform.OS === "ios" ? false : true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary30,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          fontFamily: fontFamilies.default,
          fontSize: fontSizes.xs
        },
        tabBarItemStyle: {
          paddingTop: spacings.xxs,
          paddingBottom: spacings.xs
        }
      }}>
      <BottomTab.Screen
        name="homeStack"
        component={HomeStackNavigator}
        options={{
          title: "Pokédex",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} focused={focused} icon="home" />
          )
        }}
      />
      <BottomTab.Screen
        name="profileStack"
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} focused={focused} icon="user" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon({
  focused,
  color,
  icon
}: {
  focused: boolean;
  color: string;
  icon: string;
}) {
  return (
    <>
      <View
        style={{
          width: 30,
          height: spacings.xs,
          borderRadius: cornerRadius.xs,
          backgroundColor: focused ? color : colors.background.transparent,
          marginBottom: 2
        }}></View>
      <Icon
        type="font-awesome"
        name={icon}
        color={color}
        size={iconSizes.lg}></Icon>
    </>
  );
}
