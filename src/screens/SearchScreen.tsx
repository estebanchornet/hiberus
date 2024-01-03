import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMemo, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Icon, SearchBar, Text } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PokemonListItemComponent from "../components/PokemonListItemComponent";
import { SearchStackParamsList } from "../navigation/SearchStackNavigator";
import { usePokemons } from "../services/PokemonsService";
import { colors } from "../styles/Colors";
import { iconSizes, spacings } from "../styles/Constants";
import { typographies } from "../styles/Fonts";
import { searchBarStyle } from "../styles/Inputs";

/*
    Annotation:
    I did this screen due to the lack of filter / search of the PokeAPI. They just provide skip & take
    With a real/correct API, a filter, skip & take should be managed in a single screen within a single API method, although we use an infinite scrolling
*/
export default function SearchScreen() {
  const pokemonsQuery = usePokemons();
  const [searchBarValue, setSearchBarValue] = useState("");
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<StackNavigationProp<SearchStackParamsList>>();
  const flatListRef = useRef(null);

  useScrollToTop(flatListRef);

  const filteredPokemons = useMemo(() => {
    if (!searchBarValue) {
      return [];
    }

    return pokemonsQuery.data?.filter(
      (p) =>
        p.name.toLowerCase().includes(searchBarValue.toLowerCase()) ||
        p.id.padStart(3, "0").includes(searchBarValue)
    );
  }, [searchBarValue, pokemonsQuery.data]);

  return (
    <FlatList
      ref={flatListRef}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: spacings.md
      }}
      ListHeaderComponent={
        // Known typescript issue: https://github.com/react-native-elements/react-native-elements/issues/3089
        <SearchBar
          inputStyle={searchBarStyle.input}
          inputContainerStyle={searchBarStyle.inputContainer}
          containerStyle={[
            searchBarStyle.container,
            { marginBottom: spacings.lg }
          ]}
          placeholder="Search"
          placeholderTextColor={colors.text.placeholder}
          value={searchBarValue}
          searchIcon={() => {
            return (
              <Icon
                name="search"
                type="font-awesome-5"
                size={iconSizes.md}
                color={colors.secondary}
              />
            );
          }}
          onChangeText={(value) => {
            setSearchBarValue(value);
          }}></SearchBar>
      }
      ListEmptyComponent={
        <Text style={[typographies.body, { textAlign: "center" }]}>
          {!!searchBarValue
            ? "The pokemon you are looking for was not found"
            : "Search the pokemons by name or number!"}
        </Text>
      }
      data={filteredPokemons}
      scrollIndicatorInsets={{ right: spacings.xxs, top: insets.top }}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      removeClippedSubviews
      renderItem={({ item, index }) => (
        <PokemonListItemComponent
          pokemon={item.name}
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
