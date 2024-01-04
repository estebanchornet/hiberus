import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import {
  FavoritePokemon,
  FavoritesContext,
  FavoritesContextActions,
  FavoritesContextData
} from "./FavoritesContext";
import favoritesReducer from "./FavoritesReducer";

const POKEMONS_KEY: string = "favorite_pokemons";

export default function FavoritesProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(favoritesReducer, {
    isLoading: true,
    pokemons: []
  });

  useEffect(() => {
    async function initializeAsync() {
      let pokemons: FavoritePokemon[] = [];

      try {
        const storedFavorites = await AsyncStorage.getItem(POKEMONS_KEY);
        if (storedFavorites) {
          pokemons = JSON.parse(storedFavorites);
        }
      } finally {
        dispatch({
          type: "RESTORE_POKEMONS",
          payload: pokemons
        });
      }
    }

    initializeAsync();
  }, []);

  useEffect(() => {
    async function updateFavorites() {
      try {
        await AsyncStorage.setItem(
          POKEMONS_KEY,
          JSON.stringify(state.pokemons)
        );
      } catch (e: any) {
        // Ignore
      }
    }

    updateFavorites();
  }, [state.pokemons]);

  const addPokemon = useCallback(async (pokemon: FavoritePokemon) => {
    dispatch({ type: "ADD_POKEMON", payload: pokemon });
  }, []);

  const deletePokemon = useCallback(async (pokemonId: string) => {
    dispatch({ type: "DELETE_POKEMON", payload: pokemonId });
  }, []);

  const favoritesContext: FavoritesContextActions = useMemo(
    () => ({
      addPokemon,
      deletePokemon
    }),
    [addPokemon, deletePokemon]
  );

  return (
    <FavoritesContext.Provider value={{ ...state, ...favoritesContext }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritePokemons(): FavoritesContextData {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("Favorites context is required");
  return context;
}
