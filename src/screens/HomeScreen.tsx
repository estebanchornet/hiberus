import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRef } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PokemonListItemComponent from "../components/PokemonListItemComponent";
import { PokemonListItemSkeletonComponent } from "../components/PokemonListItemSkeletonComponent";
import { HomeStackParamsList } from "../navigation/HomeStackNavigator";
import { useInfinitePokemons } from "../services/PokemonsService";
import { spacings } from "../styles/Constants";
import { typographies } from "../styles/Fonts";

export default function HomeScreen() {
  const pokemonsQuery = useInfinitePokemons();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamsList>>();
  const insets = useSafeAreaInsets();

  const flatListRef = useRef(null);

  useScrollToTop(flatListRef);

  if (pokemonsQuery.data?.pages.length === 0) {
    return (
      <Text style={typographies.body}>
        At this time there are no pokemons available.
      </Text>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: spacings.md
      }}
      data={pokemonsQuery.data?.pages.flatMap((p) => p.pokemonsCustom)}
      scrollIndicatorInsets={{ right: spacings.xxs, top: insets.top }}
      onEndReachedThreshold={0.3}
      onEndReached={() => pokemonsQuery.fetchNextPage()}
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
      ListFooterComponent={<PokemonListItemSkeletonComponent width={width} />}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}
