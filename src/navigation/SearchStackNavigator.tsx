import { createStackNavigator } from "@react-navigation/stack";
import PokemonDetailScreen from "../screens/PokemonDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import { headerStyle } from "../styles/Screens";
import { PokemonDetailScreenProps } from "./HomeStackNavigator";

export type SearchStackParamsList = {
  search: undefined;
  pokemonDetail: PokemonDetailScreenProps;
};

const SearchStack = createStackNavigator<SearchStackParamsList>();
export default function SearchStackNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: headerStyle.container,
        headerTitleStyle: headerStyle.title,
        cardStyle: {
          flex: 1
        }
      }}>
      <SearchStack.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: "Search",
          headerShown: false
        }}
      />
      <SearchStack.Screen
        name="pokemonDetail"
        component={PokemonDetailScreen}
        options={{
          title: "Pokémon"
        }}
      />
    </SearchStack.Navigator>
  );
}
