import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import HomeScreen from "../screens/HomeScreen";
import PokemonDetailScreen from "../screens/PokemonDetailScreen";
import { queryClient, queryClientPersister } from "../services/QueryService";
import { headerStyle } from "../styles/Screens";

export type HomeStackParamsList = {
  home: undefined;
  pokemonDetail: undefined;
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
          title: "Pokédex",
          // TODO: Remove this code
          headerRight: () => (
            <Button
              title="clear"
              type="clear"
              onPress={async () => {
                await queryClientPersister.removeClient();
                queryClient.clear();
              }}
            />
          )
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
