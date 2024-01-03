import { createContext } from "react";

export const FavoritesContext = createContext<FavoritesContextData>({
  isLoading: true,
  pokemons: [],
  addPokemon: async (): Promise<void> => {},
  deletePokemon: async (): Promise<void> => {}
});

export type FavoritesAction =
  | { type: "ADD_POKEMON"; payload: FavoritePokemon }
  | { type: "DELETE_POKEMON"; payload: number }
  | { type: "RESTORE_POKEMONS"; payload: FavoritePokemon[] };

export interface FavoritePokemon {
  id: number;
  name: string;
}

export interface FavoritesState {
  isLoading: boolean;
  pokemons: FavoritePokemon[];
}

export interface FavoritesContextActions {
  addPokemon: (pokemon: FavoritePokemon) => Promise<void>;
  deletePokemon: (pokemonId: number) => Promise<void>;
}

export interface FavoritesContextData
  extends FavoritesState,
    FavoritesContextActions {}
