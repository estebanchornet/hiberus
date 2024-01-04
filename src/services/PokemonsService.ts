import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";
import { getDataUrl } from "./BlobService";
import {
  infinitePokemonsQueryKey,
  pokemonQueryKey,
  pokemonSpriteKey,
  pokemonsQueryKey
} from "./QueryService";
import { PokemonsResponse } from "./clients/PokemonClient";
import { pokemonClientFactory } from "./clients/PokemonClientFactory";

export function useInfinitePokemons() {
  return useInfiniteQuery({
    queryKey: [infinitePokemonsQueryKey],
    queryFn: async ({ pageParam }) => {
      return await getPokemons(pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastGroup) => {
      return lastGroup.next;
    }
  });
}

export function usePokemons() {
  return useQuery({
    queryKey: [pokemonsQueryKey],
    queryFn: getAllPokemons
  });
}

export function usePokemon(id: string) {
  return useQuery({
    queryKey: [pokemonQueryKey, id],
    queryFn: () => getPokemon(id)
  });
}

export function usePokemonSprite(id: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [pokemonSpriteKey, id],
    queryFn: () => getPokemonSprite(id),
    ...options
  });
}

async function getPokemons(url?: string, take?: number) {
  const pokemonClient = pokemonClientFactory.create();
  const response = await pokemonClient.getPokemons(url, take);

  return mapPokemonsResponseCustom(response.data);
}

async function getAllPokemons() {
  const pokemonClient = pokemonClientFactory.create();
  const response = await pokemonClient.getPokemons(undefined, 1302);

  return mapPokemonsResponseCustom(response.data);
}

async function getPokemon(id: string) {
  const pokemonClient = pokemonClientFactory.create();
  const response = await pokemonClient.getPokemon(id);

  return response.data;
}

async function getPokemonSprite(id: number) {
  const url = Constants.expoConfig?.extra?.pokemonSpriteAddress + `/${id}.png`;

  try {
    const response = await axios.get<Blob>(url, {
      responseType: "blob"
    });

    return getDataUrl(response.data);
  } catch (e: any) {
    return null;
  }
}

function mapPokemonsResponseCustom(pokemonsResponse: PokemonsResponse) {
  const pokemonsCustom: PokemonCustom[] = [];
  pokemonsResponse.results.map(({ name, url }) => {
    const urlSplit = url.split("/");
    const id = urlSplit[urlSplit.length - 2];

    pokemonsCustom.push({
      name: name,
      id: id,
      picture: `${
        Constants.expoConfig?.extra?.pokemonSpriteAddress + `/${id}.png`
      }`
    });
  });

  const pokemonsResponseCustom: PokemonsResponseCustom = {
    next: pokemonsResponse.next,
    pokemonsCustom: pokemonsCustom
  };

  return pokemonsResponseCustom;
}

export type PokemonCustom = {
  id: string;
  name: string;
  picture: string;
};

export type PokemonsResponseCustom = {
  next: string;
  pokemonsCustom: PokemonCustom[];
};
