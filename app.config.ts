import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Pokedex",
  slug: "Pokedex",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/img/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./src/assets/img/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.estebanchornet.Pokedex"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/img/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.estebanchornet.Pokedex"
  },
  web: {
    favicon: "./src/assets/img/favicon.png"
  },
  extra: {
    eas: {
      projectId: "35e7d485-830c-464c-83f0-96d519afc2ba"
    },
    identityAddress: "http://51.38.51.187:5050/api/v1/auth",
    userApiAddress: "http://51.38.51.187:5050/api/v1/users",
    pokeApiAddress: "https://pokeapi.co/api/v2",
    pokemonSpriteAddress:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"
  },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          kotlinVersion: "1.9.20"
        }
      }
    ]
  ]
});
