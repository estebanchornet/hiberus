import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PokemonDetailScreen from "../screens/PokemonDetailScreen";
import { headerStyle } from "../styles/Screens";

export type PokemonDetailScreenProps = {
  id: string;
};

export type HomeStackParamsList = {
  home: undefined;
  pokemonDetail: PokemonDetailScreenProps;
};

const HomeStack = createStackNavigator<HomeStackParamsList>();
export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: headerStyle.container,
        headerTitleStyle: headerStyle.title,
        cardStyle: {
          flex: 1
        }
      }}>
      <HomeStack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Pokédex"
        }}
      />
      <HomeStack.Screen
        name="pokemonDetail"
        component={PokemonDetailScreen}
        options={{ title: "Pokemon" }}
      />
    </HomeStack.Navigator>
  );
}
