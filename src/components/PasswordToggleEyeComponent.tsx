import React from "react";
import { Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../styles/Colors";
import { iconSizes } from "../styles/Constants";

export default function PasswordToggleEyeComponent({
  isSecure,
  onPress
}: {
  isSecure: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => pressed && { opacity: 0.2 }}
      onPress={onPress}>
      <Icon
        type="font-awesome-5"
        name={isSecure ? "eye" : "eye-slash"}
        color={colors.primary50}
        size={iconSizes.lg}></Icon>
    </Pressable>
  );
}
