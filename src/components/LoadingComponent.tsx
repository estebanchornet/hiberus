import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../styles/Colors";
import { spacings } from "../styles/Constants";

export default function LoadingComponent() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: spacings.lg
      }}>
      <ActivityIndicator
        color={colors.primary}
        size="large"></ActivityIndicator>
    </View>
  );
}
