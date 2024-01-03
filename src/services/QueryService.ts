import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient, onlineManager } from "@tanstack/react-query";
import { NotAllowedOfflineError } from "../errors/NotAllowedOfflineError";

const defaultCacheTime = 1000 * 60 * 60 * 24 * 7;
const defaultStaleTime = 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: defaultCacheTime,
      staleTime: defaultStaleTime
    },
    mutations: {
      onMutate: () => {
        if (!onlineManager.isOnline()) {
          throw new NotAllowedOfflineError(
            "Network error!",

            "Please check your network connection"
          );
        }
      }
    }
  }
});

export const queryClientPersisterKey = "QUERY_CACHED_DATA";

export const queryClientPersister = createAsyncStoragePersister({
  key: queryClientPersisterKey,
  storage: AsyncStorage
});

export const infinitePokemonsQueryKey: string = "infinitePokemons";
export const pokemonsQueryKey: string = "pokemons";
export const pokemonQueryKey: string = "pokemon";
export const pokemonSpriteKey: string = "pokemonSprite";
export const userQueryKey: string = "user";
