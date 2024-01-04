import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import LoadingComponent from "../components/LoadingComponent";
import { useUser } from "../services/UsersService";
import { colors } from "../styles/Colors";
import { borderRadius, iconSizes, spacings } from "../styles/Constants";
import { typographies } from "../styles/Fonts";

export default function ProfileScreen() {
  const userQuery = useUser();

  if (userQuery.isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View style={{ justifyContent: "center", padding: spacings.lg }}>
      <Icon
        name="user-circle"
        type="font-awesome-5"
        size={iconSizes.xxxxl}
        color={colors.text.primary}
      />

      <View
        style={{
          marginTop: spacings.xxl,
          backgroundColor: colors.background.light,
          borderRadius: borderRadius.xl,
          padding: spacings.xl
        }}>
        <View style={{ flexDirection: "row", marginBottom: spacings.lg }}>
          <Text style={typographies.body}>Name</Text>
          <Text style={[typographies.body, styles.rightColumn]}>
            {userQuery.data.name}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: spacings.lg }}>
          <Text style={typographies.body}>Last Name</Text>
          <Text style={[typographies.body, styles.rightColumn]}>
            {userQuery.data.surname}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={typographies.body}>Email</Text>
          <Text style={[typographies.body, styles.rightColumn]}>
            {userQuery.data.email}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rightColumn: {
    flex: 1,
    textAlign: "right"
  }
});
