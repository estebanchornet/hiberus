import { Image } from "expo-image";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../styles/Colors";
import { borderRadius, spacings } from "../styles/Constants";
import { typographies } from "../styles/Fonts";

export default function PokemonListItemComponent({
  name,
  number,
  picture,
  onPokemonPress
}: {
  name: string;
  number: string;
  picture: string;
  onPokemonPress: () => void;
}) {
  const { width } = useWindowDimensions();

  return (
    <Pressable
      onPress={onPokemonPress}
      style={{
        height: 120,
        width: width * 0.5 - spacings.lg,
        marginBottom: spacings.lg,
        borderRadius: borderRadius.md,
        backgroundColor: colors.background.overlay,
        padding: spacings.md
      }}>
      <Text
        style={[
          typographies.small,
          { color: colors.text.light, zIndex: 2, textTransform: "capitalize" }
        ]}>
        {name}
      </Text>
      <Text
        style={[typographies.caption, { color: colors.text.light, zIndex: 2 }]}>
        #{number.padStart(3, "0")}
      </Text>

      <Image
        transition={300}
        source={{
          uri: picture
        }}
        style={styles.img}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 120,
    height: 120,
    position: "absolute",
    bottom: -15,
    right: -10,
    zIndex: 1
  }
});
