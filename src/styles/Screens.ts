import { StyleSheet } from "react-native";
import { colors } from "./Colors";
import { elevations } from "./Elevations";
import { fontFamilies, fontSizes } from "./Fonts";

export const headerStyle = StyleSheet.create({
  container: {
    ...elevations.sm
  },
  title: {
    fontFamily: fontFamilies.default,
    fontSize: fontSizes.xl,
    color: colors.primary,
    textAlign: "center"
  }
});

export const tabBarStyle = StyleSheet.create({
  container: {
    ...elevations.sm
  }
});
