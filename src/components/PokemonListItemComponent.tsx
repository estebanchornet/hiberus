import { Image } from "expo-image";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Text } from "react-native-elements";
import { usePokemon, usePokemonSprite } from "../services/PokemonsService";
import { colors } from "../styles/Colors";
import { cornerRadius, spacings } from "../styles/Constants";
import { typographies } from "../styles/Fonts";
import { PokemonListItemSkeletonComponent } from "./PokemonListItemSkeletonComponent";

export default function PokemonListItemComponent({
  pokemon,
  onPokemonPress
}: {
  pokemon: string;
  onPokemonPress: () => void;
}) {
  const pokemonQuery = usePokemon(pokemon);
  const pokemonSpriteQuery = usePokemonSprite(pokemonQuery.data?.id, {
    enabled: !!pokemonQuery.data
  });
  const { width } = useWindowDimensions();

  if (pokemonQuery.isLoading || pokemonSpriteQuery.isLoading) {
    return <PokemonListItemSkeletonComponent width={width} />;
  }

  if (!pokemonQuery.data) {
    return null;
  }

  return (
    <Pressable
      onPress={onPokemonPress}
      style={{
        height: 120,
        width: width * 0.5 - spacings.lg,
        marginBottom: spacings.lg,
        borderRadius: cornerRadius.md,
        backgroundColor: colors.background.overlay,
        padding: spacings.md
      }}>
      <Text
        style={[
          typographies.small,
          { color: colors.text.light, zIndex: 2, textTransform: "capitalize" }
        ]}>
        {pokemonQuery.data?.name}
      </Text>
      <Text
        style={[typographies.caption, { color: colors.text.light, zIndex: 2 }]}>
        #{pokemonQuery.data?.id.toString().padStart(3, "0")}
      </Text>

      <Image
        transition={300}
        source={{
          uri: pokemonSpriteQuery.data
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
