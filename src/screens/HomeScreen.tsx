import { FlatList } from "react-native";
import PokemonListItemComponent from "../components/PokemonListItemComponent";
import { useInfinitePokemons } from "../services/PokemonsService";
import { spacings } from "../styles/Constants";

export default function HomeScreen() {
  const pokemonsQuery = useInfinitePokemons();

  return (
    <FlatList
      contentContainerStyle={{
        paddingVertical: spacings.lg
      }}
      data={pokemonsQuery.data?.pages.flatMap((p) => p.results)}
      scrollIndicatorInsets={{ right: spacings.xxs }}
      onEndReachedThreshold={0.3}
      onEndReached={() => pokemonsQuery.fetchNextPage()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-evenly" }}
      removeClippedSubviews
      renderItem={({ item, index }) => (
        <PokemonListItemComponent pokemon={item} key={index} />
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}
