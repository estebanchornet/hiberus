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
    queryFn: async () => {
      const pokemonsResponse = await getPokemons(undefined, 1302);
      const pokemons: PokemonCustom[] = pokemonsResponse.results.map((pr) => {
        const urlParts = pr.url.split("/");
        const id = urlParts[urlParts.length - 2];

        return {
          id: id,
          name: pr.name
        };
      });

      return pokemons;
    }
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

  return response.data;
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

export type PokemonCustom = {
  id: string;
  name: string;
};
