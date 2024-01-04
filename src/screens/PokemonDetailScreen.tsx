import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Tab, TabView, Text } from "react-native-elements";
import LoadingComponent from "../components/LoadingComponent";
import { HomeStackParamsList } from "../navigation/HomeStackNavigator";
import { useFavoritePokemons } from "../providers/FavoritesProvider";
import { usePokemon, usePokemonSprite } from "../services/PokemonsService";
import { Pokemon } from "../services/clients/PokemonClient";
import { colors } from "../styles/Colors";
import { borderRadius, spacings } from "../styles/Constants";
import { typographies } from "../styles/Fonts";

export default function PokemonDetailScreen() {
  const route = useRoute<RouteProp<HomeStackParamsList, "pokemonDetail">>();
  const navigation = useNavigation();
  const pokemonQuery = usePokemon(route.params.id);
  const pokemonSpriteQuery = usePokemonSprite(pokemonQuery.data?.id, {
    enabled: !!pokemonQuery.data
  });
  const favoritePokemons = useFavoritePokemons();
  const isFavorite = favoritePokemons.pokemons.some(
    (p) => p.id === pokemonQuery.data.id
  );

  useEffect(() => {
    if (pokemonQuery.data) {
      navigation.setOptions({
        headerRight: () => (
          <Icon
            name="heart"
            solid={isFavorite}
            type="font-awesome-5"
            color={colors.text.link}
            containerStyle={{ marginRight: spacings.md }}
            onPress={() => {
              if (isFavorite) {
                favoritePokemons.deletePokemon(pokemonQuery.data.id);
              } else {
                favoritePokemons.addPokemon({
                  id: pokemonQuery.data.id,
                  name: pokemonQuery.data.name
                });
              }
            }}
          />
        )
      });
    }
  }, [
    pokemonQuery.data,
    favoritePokemons.addPokemon,
    favoritePokemons.deletePokemon,
    isFavorite
  ]);

  if (pokemonQuery.isLoading) {
    return <LoadingComponent />;
  }

  if (!pokemonQuery.data) {
    return (
      <Text style={typographies.body}>
        The pokemon you are looking for was not found.
      </Text>
    );
  }

  return (
    <>
      <View style={{ padding: spacings.lg, height: 350 }}>
        <View style={{ flexDirection: "row", marginBottom: spacings.lg }}>
          <Text
            style={[
              typographies.title,
              { flex: 1, textTransform: "capitalize", fontSize: 32 }
            ]}>
            {pokemonQuery.data.name}
          </Text>

          <View
            style={{
              paddingHorizontal: spacings.sm,
              backgroundColor: colors.chip.primary,
              borderRadius: borderRadius.lg,
              justifyContent: "center"
            }}>
            <Text style={[typographies.body, { color: colors.text.light }]}>
              #{pokemonQuery.data.id.toString().padStart(3, "0")}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: spacings.sm }}>
          {pokemonQuery.data.types.map((type, index) => (
            <View
              key={index}
              style={{
                padding: spacings.sm,
                backgroundColor: colors.chip.primary,
                borderRadius: borderRadius.lg
              }}>
              <Text
                style={[
                  typographies.small,
                  { textTransform: "capitalize", color: colors.text.light }
                ]}>
                {type.type.name}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.imgWrapper}>
          <Image
            transition={300}
            source={{
              uri: pokemonSpriteQuery.data
            }}
            style={styles.img}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.background.light,
          height: "100%",
          borderRadius: borderRadius.xxxl,
          zIndex: -1,
          position: "relative"
        }}>
        <DetailSection pokemon={pokemonQuery.data} />
      </View>
    </>
  );
}

function DetailSection({ pokemon }: { pokemon: Pokemon }) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <>
      <Tab
        value={selectedTabIndex}
        onChange={setSelectedTabIndex}
        indicatorStyle={{ backgroundColor: colors.background.selected }}>
        <Tab.Item
          containerStyle={{ backgroundColor: colors.background.transparent }}
          titleStyle={{ color: colors.text.primary }}
          title="About"
        />

        <Tab.Item
          containerStyle={{ backgroundColor: colors.background.transparent }}
          titleStyle={{ color: colors.text.primary }}
          title="Statistics"
        />
      </Tab>

      <TabView value={selectedTabIndex} onChange={setSelectedTabIndex}>
        <TabView.Item>
          <View
            style={{
              padding: spacings.xl
            }}>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                gap: spacings.sm,
                marginBottom: spacings.md
              }}>
              <Text style={[typographies.small, styles.leftColumn]}>
                Weight:
              </Text>
              <Text style={typographies.small}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                display: "flex",
                gap: spacings.sm,
                marginBottom: spacings.md
              }}>
              <Text style={[typographies.small, styles.leftColumn]}>
                Height:
              </Text>
              <Text style={typographies.small}>
                {(pokemon.height * 10).toFixed(1)} cm
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                display: "flex",
                gap: spacings.sm
              }}>
              <Text style={[typographies.small, styles.leftColumn]}>
                Abilities:
              </Text>
              <Text
                style={[typographies.small, { textTransform: "capitalize" }]}>
                {pokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </Text>
            </View>
          </View>
        </TabView.Item>

        <TabView.Item
          style={{
            padding: spacings.xl,
            flexDirection: "column",
            flex: 1
          }}>
          <View>
            {pokemon.stats.map((stat, index) => {
              return (
                <PokemonStat
                  name={stat.stat.name}
                  baseStat={stat.base_stat}
                  percentage={150}
                  key={index}
                />
              );
            })}

            <PokemonStat
              name="Total"
              baseStat={pokemon.stats.reduce(
                (prev, curr) => prev + curr.base_stat,
                0
              )}
              percentage={1000}
            />
          </View>
        </TabView.Item>
      </TabView>
    </>
  );
}

function PokemonStat({
  name,
  baseStat,
  percentage
}: {
  name: string;
  baseStat: number;
  percentage: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: spacings.sm,
        marginBottom: spacings.md,
        alignItems: "center"
      }}>
      <Text
        style={[
          typographies.small,
          styles.leftColumn,
          { textTransform: "capitalize" }
        ]}>
        {name}:
      </Text>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              backgroundColor: baseStat < 75 ? colors.danger : colors.success,
              width: `${(baseStat * 100) / percentage}%`
            }
          ]}
        />
      </View>

      <Text style={[typographies.small, styles.progressBarNumber]}>
        {baseStat}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imgWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: -20,
    width: "100%",
    zIndex: 1
  },
  img: {
    width: 280,
    height: 280
  },
  leftColumn: {
    minWidth: 110
  },
  progressBarContainer: {
    overflow: "hidden",
    flexGrow: 1,
    height: 5,
    backgroundColor: colors.skeleton.background,
    borderRadius: borderRadius.sm
  },
  progressBar: {
    height: 5
  },
  progressBarNumber: {
    width: 35,
    textAlign: "right"
  }
});
