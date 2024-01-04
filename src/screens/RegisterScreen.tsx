import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Button, Input } from "react-native-elements";
import validator from "validator";
import PasswordToggleEyeComponent from "../components/PasswordToggleEyeComponent";
import ScrollViewComponent from "../components/ScrollViewComponent";
import { isManagedException } from "../errors/ApplicationBaseError";
import { AuthenticationStackParamsList } from "../navigation/AuthenticationStackNavigator";
import { useRegisterAsync } from "../services/AuthenticationService";
import { toastError, toastSuccess } from "../services/ToastService";
import { largePrimaryRoundedButtonStyle } from "../styles/Buttons";
import { colors } from "../styles/Colors";
import { borderRadius, spacings } from "../styles/Constants";
import { largeInputStyle } from "../styles/Inputs";

export default function RegisterScreen() {
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationStackParamsList>>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const [confirmPasswordSecureTextEntry, setConfirmPasswordSecureTextEntry] =
    useState(true);
  const [formFieldsValidation, setFormFieldsValidation] = useState({
    firstNameIsValid: true,
    lastNameIsValid: true,
    emailIsValid: true,
    passwordMatchLength: true,
    confirmPasswordMatchLength: true,
    confirmPasswordEquality: true,
    passwordMatchAlphanumeric: true
  });

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const registerMutation = useRegisterAsync();

  const minPasswordLength = 6;

  const validatePassword = useCallback(() => {
    setFormFieldsValidation({
      ...formFieldsValidation,
      passwordMatchLength: validator.isLength(password, {
        min: minPasswordLength
      }),
      passwordMatchAlphanumeric: validator.matches(
        password,
        "^(?=.*\\d)(?=.*[a-zA-Z]).{0,}$"
      )
    });
  }, [formFieldsValidation, password]);

  const validateConfirmPassword = useCallback(() => {
    setFormFieldsValidation({
      ...formFieldsValidation,
      confirmPasswordMatchLength: validator.isLength(confirmPassword, {
        min: minPasswordLength
      }),
      confirmPasswordEquality: validator.equals(confirmPassword, password)
    });
  }, [formFieldsValidation, confirmPassword, password]);

  const validateFirstName = useCallback(
    (value?: string) => {
      const isFirstNameValid = !validator.isEmpty(value);

      setFormFieldsValidation({
        ...formFieldsValidation,
        firstNameIsValid: isFirstNameValid
      });
    },
    [formFieldsValidation]
  );

  const validateLastName = useCallback(
    (value?: string) => {
      const isLastNameValid = !validator.isEmpty(value);

      setFormFieldsValidation({
        ...formFieldsValidation,
        lastNameIsValid: isLastNameValid
      });
    },
    [formFieldsValidation]
  );

  const isFormValid =
    email &&
    password &&
    confirmPassword &&
    formFieldsValidation.firstNameIsValid &&
    formFieldsValidation.lastNameIsValid &&
    formFieldsValidation.emailIsValid &&
    formFieldsValidation.passwordMatchLength &&
    formFieldsValidation.passwordMatchAlphanumeric &&
    formFieldsValidation.confirmPasswordMatchLength &&
    formFieldsValidation.confirmPasswordEquality;

  const registerAsync = useCallback(async () => {
    if (!isFormValid) {
      return;
    }

    try {
      await registerMutation.mutateAsync({
        firstName,
        lastName,
        email,
        password
      });
      toastSuccess("Register success", "User registered successfully!");
      navigation.navigate("login");
    } catch (e: any) {
      const managedException = isManagedException(e);
      if (managedException) {
        toastError(managedException.title, managedException.message);
        return;
      }

      switch (e?.response?.status) {
        case 409:
          toastError(
            "Register failed",
            "An account with the email provided already exists."
          );
          break;

        default:
          toastError("Register failed", "Internal server error");
          break;
      }
    }
  }, [isFormValid, firstName, lastName, email, password]);

  return (
    <ScrollViewComponent>
      <Input
        autoFocus={true}
        inputContainerStyle={largeInputStyle.inputContainer}
        containerStyle={[
          firstNameContainerStyle,
          !formFieldsValidation.firstNameIsValid && {
            backgroundColor: colors.danger30
          }
        ]}
        returnKeyType="next"
        onSubmitEditing={() => lastNameRef.current?.focus()}
        inputStyle={largeInputStyle.input}
        placeholder="First name *"
        autoCorrect={false}
        placeholderTextColor={colors.text.placeholder}
        onBlur={() => validateFirstName(firstName)}
        onChangeText={(value) => {
          validateFirstName(value);
          setFirstName(value);
        }}
        value={firstName}
      />

      <Input
        inputContainerStyle={largeInputStyle.inputContainer}
        containerStyle={[
          lastNameContainerStyle,
          !formFieldsValidation.lastNameIsValid && {
            backgroundColor: colors.danger30
          }
        ]}
        ref={lastNameRef}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        inputStyle={largeInputStyle.input}
        placeholder="Last name *"
        autoCorrect={false}
        placeholderTextColor={colors.text.placeholder}
        onBlur={() => validateLastName(lastName)}
        onChangeText={(value) => {
          validateLastName(value);
          setLastName(value);
        }}
        value={lastName}
      />

      <Input
        ref={emailRef}
        inputMode="email"
        inputContainerStyle={largeInputStyle.inputContainer}
        containerStyle={[
          largeInputStyle.container,
          { marginVertical: spacings.lg }
        ]}
        inputStyle={largeInputStyle.input}
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={colors.text.placeholder}
        onChangeText={setEmail}
        value={email}
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordRef.current?.focus();
        }}
      />

      <Input
        inputContainerStyle={largeInputStyle.inputContainer}
        containerStyle={[
          largeInputStyle.container,
          {
            borderBottomLeftRadius: spacings.none,
            borderBottomRightRadius: spacings.none,
            marginBottom: spacings.xxs,
            ...((!formFieldsValidation.passwordMatchLength ||
              !formFieldsValidation.passwordMatchAlphanumeric) && {
              backgroundColor: colors.danger30
            })
          }
        ]}
        ref={passwordRef}
        returnKeyType="next"
        onSubmitEditing={() => {
          confirmPasswordRef.current?.focus();
        }}
        inputStyle={largeInputStyle.input}
        placeholder="Password *"
        autoCorrect={false}
        placeholderTextColor={colors.text.placeholder}
        autoCapitalize="none"
        rightIcon={
          <PasswordToggleEyeComponent
            isSecure={passwordSecureTextEntry}
            onPress={() => setPasswordSecureTextEntry(!passwordSecureTextEntry)}
          />
        }
        secureTextEntry={passwordSecureTextEntry}
        onBlur={() => validatePassword()}
        onChangeText={setPassword}
        value={password}></Input>

      <Input
        containerStyle={[
          largeInputStyle.container,
          {
            borderTopLeftRadius: spacings.none,
            borderTopRightRadius: spacings.none,
            marginBottom: spacings.xxl,
            ...((!formFieldsValidation.confirmPasswordMatchLength ||
              !formFieldsValidation.confirmPasswordEquality) && {
              backgroundColor: colors.danger30
            })
          }
        ]}
        inputContainerStyle={largeInputStyle.inputContainer}
        inputStyle={largeInputStyle.input}
        rightIcon={
          <PasswordToggleEyeComponent
            isSecure={confirmPasswordSecureTextEntry}
            onPress={() =>
              setConfirmPasswordSecureTextEntry(!confirmPasswordSecureTextEntry)
            }
          />
        }
        secureTextEntry={confirmPasswordSecureTextEntry}
        placeholder="Confirm password *"
        ref={confirmPasswordRef}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={colors.text.placeholder}
        onChangeText={setConfirmPassword}
        onBlur={() => validateConfirmPassword()}
        onSubmitEditing={registerAsync}
        value={confirmPassword}
        errorMessage={
          !formFieldsValidation.passwordMatchLength
            ? "Minimum length 6 characters."
            : !formFieldsValidation.passwordMatchAlphanumeric
            ? "Alphanumeric characters required."
            : !formFieldsValidation.confirmPasswordMatchLength
            ? "Minimum length 6 characters."
            : !formFieldsValidation.confirmPasswordEquality
            ? "Passwords do not match."
            : undefined
        }></Input>

      <Button
        title="Sign up"
        onPress={registerAsync}
        disabled={!isFormValid || registerMutation.isPending}
        titleStyle={largePrimaryRoundedButtonStyle.title}
        containerStyle={largePrimaryRoundedButtonStyle.container}
        buttonStyle={largePrimaryRoundedButtonStyle.button}
        loadingStyle={largePrimaryRoundedButtonStyle.loading}
        disabledStyle={largePrimaryRoundedButtonStyle.disabled}
      />
    </ScrollViewComponent>
  );
}

const firstNameContainerStyle = StyleSheet.flatten([
  largeInputStyle.container,
  {
    borderRadius: undefined,
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
    marginBottom: spacings.xxs
  }
]);

const lastNameContainerStyle = StyleSheet.flatten([
  largeInputStyle.container,
  {
    borderRadius: undefined,
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md
  }
]);
