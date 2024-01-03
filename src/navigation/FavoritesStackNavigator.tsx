import { createStackNavigator } from "@react-navigation/stack";
import FavoritesScreen from "../screens/FavoritesScreen";
import PokemonDetailScreen from "../screens/PokemonDetailScreen";
import { headerStyle } from "../styles/Screens";
import { PokemonDetailScreenProps } from "./HomeStackNavigator";

export type FavoritesStackParamsList = {
  favorites: undefined;
  pokemonDetail: PokemonDetailScreenProps;
};

const FavoritesStack = createStackNavigator<FavoritesStackParamsList>();
export default function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: headerStyle.container,
        headerTitleStyle: headerStyle.title,
        cardStyle: {
          flex: 1
        }
      }}>
      <FavoritesStack.Screen
        name="favorites"
        component={FavoritesScreen}
        options={{
          headerShown: false,
          title: "Favorites"
        }}
      />
      <FavoritesStack.Screen
        name="pokemonDetail"
        component={PokemonDetailScreen}
        options={{
          title: "Pokémon"
        }}
      />
    </FavoritesStack.Navigator>
  );
}
