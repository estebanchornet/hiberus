import { createContext } from "react";

export const FavoritesContext = createContext<FavoritesContextData>({
  isLoading: true,
  pokemons: [],
  addPokemon: async (): Promise<void> => {},
  deletePokemon: async (): Promise<void> => {}
});

export type FavoritesAction =
  | { type: "ADD_POKEMON"; payload: FavoritePokemon }
  | { type: "DELETE_POKEMON"; payload: string }
  | { type: "RESTORE_POKEMONS"; payload: FavoritePokemon[] };

export interface FavoritePokemon {
  id: string;
  name: string;
  picture: string;
}

export interface FavoritesState {
  isLoading: boolean;
  pokemons: FavoritePokemon[];
}

export interface FavoritesContextActions {
  addPokemon: (pokemon: FavoritePokemon) => Promise<void>;
  deletePokemon: (pokemonId: string) => Promise<void>;
}

export interface FavoritesContextData
  extends FavoritesState,
    FavoritesContextActions {}
