import { FavoritesAction, FavoritesState } from "./FavoritesContext";

export default function favoritesReducer(
  prevState: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case "ADD_POKEMON":
      return {
        ...prevState,
        pokemons: [...prevState.pokemons, action.payload]
      };
    case "DELETE_POKEMON":
      return {
        ...prevState,
        pokemons: prevState.pokemons.filter((p) => p.id !== action.payload)
      };
    case "RESTORE_POKEMONS":
      return {
        ...prevState,
        isLoading: false,
        pokemons: action.payload
      };
    default:
      return prevState;
  }
}
