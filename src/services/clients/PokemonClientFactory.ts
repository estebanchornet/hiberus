import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";
import { PokemonClient } from "./PokemonClient";

export const pokemonClientAxiosInstance: AxiosInstance = axios.create();

const pokemonClient = new PokemonClient(
  Constants.expoConfig?.extra?.pokeApiAddress,
  pokemonClientAxiosInstance
);

class PokemonClientFactory {
  create(): PokemonClient {
    return pokemonClient;
  }
}

export const pokemonClientFactory: PokemonClientFactory =
  new PokemonClientFactory();
