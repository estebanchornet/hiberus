import { StyleSheet } from "react-native";
import { colors } from "./Colors";

export const fontFamilies = {
  default: "Roboto-Regular"
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20
};

export const typographies = StyleSheet.create({
  caption: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.xs,
    color: colors.text.primary
  },
  small: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.sm,
    color: colors.text.primary
  },
  body: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.md,
    color: colors.text.primary
  },
  title: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.xl,
    color: colors.text.tertiary
  }
});
