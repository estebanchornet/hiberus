import Toast, { ToastOptions } from "react-native-toast-message";
import { ToastType } from "../components/ToastLayoutComponent";

const defaultOptions: ToastOptions = {
  type: "customToast"
};

export function toastSuccess(title: string, message: string): void {
  Toast.show({
    props: {
      title: title,
      message: message,
      toastType: ToastType.Success
    },
    ...defaultOptions
  });
}

export function toastError(title: string, message: string): void {
  Toast.show({
    props: {
      title: title,
      message: message,
      toastType: ToastType.Error
    },
    ...defaultOptions
  });
}

export function toastInfo(title: string, message: string): void {
  Toast.show({
    props: {
      title: title,
      message: message,
      toastType: ToastType.Info
    },
    ...defaultOptions
  });
}
