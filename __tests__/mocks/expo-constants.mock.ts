// mocks/expo-constants-mock.js
module.exports = {
  ...jest.requireActual("expo-constants"),
  Constants: {
    expoConfig: {
      extra: {
        identityAddress: "http://identity",
        userApiAddress: "http://users",
        pokeApiAddress: "https://pokeapi",
        pokemonSpriteAddress: "https://sprites"
      }
    }
  }
};
