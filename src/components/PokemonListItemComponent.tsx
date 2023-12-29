import Constants from "expo-constants";
import { Image } from "expo-image";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-elements";
import { usePokemon } from "../services/PokemonsService";
import { PokemonResponse } from "../services/clients/PokemonClient";
import { colors } from "../styles/Colors";
import { cornerRadius, spacings } from "../styles/Constants";

export default function PokemonListItemComponent({
  pokemon
}: {
  pokemon: PokemonResponse;
}) {
  const pokemonQuery = usePokemon(pokemon.name);
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        height: 120,
        width: width * 0.5 - spacings.lg,
        marginBottom: 15,
        borderRadius: cornerRadius.md,
        backgroundColor: colors.background.light,
        padding: spacings.lg
      }}>
      <Text>{pokemonQuery.data?.name.toUpperCase()}</Text>
      <Text>#{pokemonQuery.data?.id.toString().padStart(3, "0")}</Text>

      <Image
        source={{
          uri:
            Constants.expoConfig?.extra?.pokemonSpriteAddress +
            `/${pokemonQuery.data?.id}.png`
        }}
        style={{
          width: 100,
          height: 100,
          position: "absolute",
          bottom: -15,
          right: -10,
          zIndex: 1
        }}
      />
    </View>
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
