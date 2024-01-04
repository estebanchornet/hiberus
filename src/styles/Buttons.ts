import { StyleSheet } from "react-native";
import { colors } from "./Colors";
import { borderRadius, spacings } from "./Constants";
import { fontFamilies, fontSizes } from "./Fonts";

const largeHeight: number = 54;

export const largePrimaryRoundedButtonStyle = StyleSheet.create({
  container: { alignSelf: "stretch", borderRadius: borderRadius.xxxl },
  button: {
    backgroundColor: colors.primary,
    padding: spacings.none,
    height: largeHeight
  },
  title: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.lg,
    color: colors.text.light
  },
  loading: {
    backgroundColor: colors.primary50,
    height: "100%",
    flex: 1
  },
  disabled: {
    backgroundColor: colors.background.disabled
  }
});

export const largePrimaryOutlineRoundedButtonStyle = StyleSheet.create({
  button: {
    borderRadius: borderRadius.xxxl,
    backgroundColor: colors.background.transparent,
    height: largeHeight,
    borderColor: colors.border.primary,
    borderWidth: borderRadius.xxs,
    alignSelf: "stretch"
  },
  title: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.lg,
    color: colors.primary
  },
  disabled: {
    backgroundColor: colors.background.disabled,
    borderColor: colors.border.disabled
  }
});
