import { useHeaderHeight } from "@react-navigation/elements";
import React, { JSXElementConstructor, ReactElement } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControlProps,
  ScrollView,
  StyleProp,
  ViewStyle
} from "react-native";
import { spacings } from "../styles/Constants";

export default function ScrollViewComponent({
  children,
  refreshControl,
  scrollViewContentContainerStyle,
  scrollViewStyle,
  scrollViewBounceVertical
}: {
  children: React.ReactNode;
  refreshControl?:
    | ReactElement<RefreshControlProps, string | JSXElementConstructor<any>>
    | undefined;
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>;
  scrollViewBounceVertical?: boolean;
  scrollViewStyle?: StyleProp<ViewStyle>;
}) {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      {...(Platform.OS === "ios" && {
        behavior: "padding",
        keyboardVerticalOffset: headerHeight
      })}>
      <ScrollView
        scrollIndicatorInsets={{ right: spacings.xxs }}
        style={[{ height: "100%" }, scrollViewStyle]}
        alwaysBounceVertical={scrollViewBounceVertical}
        refreshControl={refreshControl}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          scrollViewContentContainerStyle,
          {
            padding: spacings.lg,
            alignSelf: "center",
            width: "100%"
          }
        ]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
