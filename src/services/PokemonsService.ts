import {
  UseQueryOptions,
  useInfiniteQuery,
  useQuery
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import {
  pokemonQueryKey,
  pokemonSpriteKey,
  pokemonsQueryKey
} from "./QueryService";
import { pokemonClientFactory } from "./clients/PokemonClientFactory";

export function useInfinitePokemons() {
  return useInfiniteQuery({
    queryKey: [pokemonsQueryKey],
    queryFn: async ({ pageParam }) => {
      return await getPokemons(pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastGroup) => {
      return lastGroup.next;
    }
  });
}

export function usePokemon(id: string) {
  return useQuery({
    queryKey: [pokemonQueryKey, id],
    queryFn: () => getPokemon(id)
  });
}

// TODO: To check if we keep it
export function usePokemonSprite(id: number, options: UseQueryOptions) {
  return useQuery({
    queryKey: [pokemonSpriteKey, id],
    queryFn: () => getPokemonSprite(id),
    ...options
  });
}

async function getPokemons(url?: string) {
  const pokemonClient = pokemonClientFactory.create();
  const response = await pokemonClient.getPokemons(url);

  return response.data;
}

async function getPokemon(id: string) {
  const pokemonClient = pokemonClientFactory.create();
  const response = await pokemonClient.getPokemon(id);

  return response.data;
}

// TODO: To check if we keep it
async function getPokemonSprite(id: number) {
  const url = Constants.expoConfig?.extra?.pokemonSpriteAddress + `/${id}.png`;
  const options: AxiosRequestConfig = {
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json"
    }
  };

  const response = this.instance.request(options);

  console.log("SPRITE", response);
  return response;
}

export type PokemonCustom = {
  id: string;
  name: string;
  picture: string;
  color?: string;
};
