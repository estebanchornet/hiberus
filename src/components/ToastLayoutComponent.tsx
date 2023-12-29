import React from "react";
import { View, useWindowDimensions } from "react-native";
import { Icon, Text } from "react-native-elements";
import { ToastConfig, ToastConfigParams } from "react-native-toast-message";
import { colors } from "../styles/Colors";
import { cornerRadius, iconSizes, spacings } from "../styles/Constants";
import { elevations } from "../styles/Elevations";
import { typographies } from "../styles/Fonts";

export enum ToastType {
  Success = "success",
  Error = "error",
  Info = "info"
}

export declare type ToastProps = {
  title: string;
  message: string;
  toastType: ToastType;
};

export const toastConfig: ToastConfig = {
  customToast: ({ props }: ToastConfigParams<ToastProps>) => (
    <ToastLayoutComponent props={props}></ToastLayoutComponent>
  )
};

export default function ToastLayoutComponent({ props }: { props: ToastProps }) {
  const { width } = useWindowDimensions();
  const minWidth = Math.min(420, width) - spacings.xl * 2;

  return (
    <View
      style={[
        elevations.md,
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: spacings.lg,
          backgroundColor: colors.background.light,
          borderRadius: cornerRadius.xxl,
          minHeight: spacings.xxl * 2,
          minWidth: minWidth,
          maxWidth: minWidth,
          flexDirection: "row"
        }
      ]}>
      <Icon
        name={
          props.toastType == ToastType.Success
            ? "check-circle"
            : props.toastType == ToastType.Error
            ? "exclamation-circle"
            : "info-circle"
        }
        type="font-awesome-5"
        size={iconSizes.lg}
        color={
          props.toastType == ToastType.Success
            ? colors.success
            : props.toastType == ToastType.Error
            ? colors.danger
            : colors.info
        }
      />
      <View
        style={{
          marginLeft: spacings.md,
          marginVertical: spacings.md,
          flex: 1
        }}>
        <Text
          numberOfLines={1}
          style={[
            typographies.small,
            {
              color: colors.text.tertiary
            }
          ]}>
          {props.title}
        </Text>
        <Text numberOfLines={3} style={typographies.small}>
          {props.message}
        </Text>
      </View>
    </View>
  );
}
