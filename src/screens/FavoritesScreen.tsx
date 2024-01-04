import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRef } from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoadingComponent from "../components/LoadingComponent";
import PokemonListItemComponent from "../components/PokemonListItemComponent";
import { FavoritesStackParamsList } from "../navigation/FavoritesStackNavigator";
import { useFavoritePokemons } from "../providers/FavoritesProvider";
import { spacings } from "../styles/Constants";
import { typographies } from "../styles/Fonts";

export default function FavoritesScreen() {
  const { pokemons, isLoading } = useFavoritePokemons();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<StackNavigationProp<FavoritesStackParamsList>>();
  const flatListRef = useRef(null);

  useScrollToTop(flatListRef);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <FlatList
      ref={flatListRef}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: spacings.md
      }}
      ListEmptyComponent={
        <Text style={[typographies.body, { textAlign: "center" }]}>
          You don't have any pokémon marked as favorite yet! What are you
          waiting for?
        </Text>
      }
      ListHeaderComponentStyle={{
        alignItems: "center",
        marginBottom: spacings.lg
      }}
      ListHeaderComponent={
        <Text style={typographies.title}>Favorite Pokémons</Text>
      }
      data={pokemons}
      scrollIndicatorInsets={{ right: spacings.xxs, top: insets.top }}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item, index }) => (
        <PokemonListItemComponent
          name={item.name}
          number={item.id}
          picture={item.picture}
          onPokemonPress={() =>
            navigation.navigate("pokemonDetail", { id: item.name })
          }
          key={index}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}
