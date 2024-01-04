import { StyleSheet } from "react-native";
import { colors } from "./Colors";
import { borderRadius, spacings } from "./Constants";
import { fontFamilies } from "./Fonts";

export const largeInputStyle = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: colors.background.light,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacings.lg,
    paddingVertical: spacings.sm,
    height: 46
  },
  input: {
    fontFamily: fontFamilies.default,
    color: colors.text.primary,
    minWidth: 1
  },
  inputContainer: {
    borderBottomWidth: borderRadius.none,
    height: "100%",
    width: "100%"
  }
});

export const searchBarStyle = {
  container: StyleSheet.flatten([
    largeInputStyle.container,
    {
      paddingVertical: spacings.none,
      borderTopWidth: spacings.none,
      borderBottomWidth: spacings.none,
      width: "100%"
    }
  ]),
  input: largeInputStyle.input,
  inputContainer: StyleSheet.flatten([
    largeInputStyle.inputContainer,
    {
      backgroundColor: colors.background.transparent
    }
  ])
};
