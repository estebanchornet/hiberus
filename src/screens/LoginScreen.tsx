import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useCallback, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordToggleEyeComponent from "../components/PasswordToggleEyeComponent";
import { AuthenticationStackParamsList } from "../navigation/AuthenticationStackNavigator";
import { useAuth } from "../providers/AuthProvider";
import {
  largePrimaryOutlineRoundedButtonStyle,
  largePrimaryRoundedButtonStyle
} from "../styles/Buttons";
import { colors } from "../styles/Colors";
import { spacings } from "../styles/Constants";
import { typographies } from "../styles/Fonts";
import { largeInputStyle } from "../styles/Inputs";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const navigation =
    useNavigation<NavigationProp<AuthenticationStackParamsList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const passwordRef = useRef<TextInput>(null);

  const signInAsync = useCallback(async () => {
    await signIn(email, password);
  }, [email, password]);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: spacings.lg,
        flex: 1
      }}>
      <Image
        style={{
          alignSelf: "center",
          width: 150,
          height: 150,
          marginTop: spacings.xl
        }}
        source={require("../assets/img/logo.png")}
        contentFit="contain"
      />

      <Input
        inputMode="email"
        inputContainerStyle={largeInputStyle.inputContainer}
        containerStyle={[
          largeInputStyle.container,
          {
            marginTop: 70,
            borderBottomLeftRadius: spacings.none,
            borderBottomRightRadius: spacings.none
          }
        ]}
        inputStyle={largeInputStyle.input}
        placeholder={"Email"}
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
            marginTop: spacings.xxs,
            marginBottom: spacings.md,
            borderTopLeftRadius: spacings.none,
            borderTopRightRadius: spacings.none
          }
        ]}
        ref={passwordRef}
        inputStyle={largeInputStyle.input}
        placeholder="Password"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={colors.text.placeholder}
        rightIcon={
          <PasswordToggleEyeComponent
            isSecure={passwordSecureTextEntry}
            onPress={() => setPasswordSecureTextEntry(!passwordSecureTextEntry)}
          />
        }
        secureTextEntry={passwordSecureTextEntry}
        onChangeText={setPassword}
        onSubmitEditing={signInAsync}
        value={password}></Input>

      <Button
        title="Sign in"
        onPress={signInAsync}
        titleStyle={largePrimaryRoundedButtonStyle.title}
        containerStyle={largePrimaryRoundedButtonStyle.container}
        buttonStyle={largePrimaryRoundedButtonStyle.button}
        loadingStyle={largePrimaryRoundedButtonStyle.loading}
        disabledStyle={largePrimaryRoundedButtonStyle.disabled}
      />

      <View
        style={{
          marginHorizontal: spacings.lg,
          flex: 1,
          justifyContent: "flex-end"
        }}>
        <Text
          style={[
            typographies.body,
            { textAlign: "center", marginBottom: spacings.sm }
          ]}>
          {"Don't have an account?"}
        </Text>

        <Button
          title="Sign up"
          titleStyle={largePrimaryOutlineRoundedButtonStyle.title}
          onPress={() => navigation.navigate("register")}
          buttonStyle={largePrimaryOutlineRoundedButtonStyle.button}></Button>
      </View>
    </SafeAreaView>
  );
}
