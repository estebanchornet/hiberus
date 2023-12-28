import { StyleSheet } from "react-native";
import { colors } from "./Colors";
import { cornerRadius, spacings } from "./Constants";
import { fontFamilies, fontSizes } from "./Fonts";

const largeHeight: number = 54;
const mediumHeight: number = 41;

export const largePrimaryRoundedButtonStyle = StyleSheet.create({
  container: { alignSelf: "stretch", borderRadius: cornerRadius.xxxl },
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
    borderRadius: cornerRadius.xxxl,
    backgroundColor: colors.background.transparent,
    height: largeHeight,
    borderColor: colors.border.primary,
    borderWidth: cornerRadius.xxs,
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

export const largeActionRoundedButtonStyle = StyleSheet.create({
  container: {
    borderRadius: cornerRadius.xxxl
  },
  button: {
    backgroundColor: colors.background.light,
    paddingHorizontal: spacings.xxl,
    height: largeHeight
  },
  title: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.lg,
    color: colors.text.link
  }
});

export const mediumActionRoundedButtonStyle = StyleSheet.create({
  container: {
    borderRadius: cornerRadius.xxxl
  },
  button: {
    backgroundColor: colors.background.light,
    paddingHorizontal: spacings.xxl,
    height: mediumHeight
  },
  title: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.lg,
    color: colors.text.link
  }
});
