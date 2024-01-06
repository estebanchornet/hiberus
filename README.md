# Pokédex

## Infrastructure

This project has been built with [React Native](https://reactnative.dev/), [Expo](https://docs.expo.dev/) & [Typescript](https://www.typescriptlang.org/)

#### Dev Tools

- [nodeJS](https://nodejs.dev/)
- [git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/)

#### VSCode Extensions:

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
- [React-Native/React/Redux snippets](https://marketplace.visualstudio.com/items?itemName=EQuimper.react-native-react-redux)

#### Main packages

- Navigation & routing: [React Navigation](https://reactnavigation.org/)
- HTTP client: [axios-http](https://axios-http.com/)
- Data / query caching: [TanStack Query](https://tanstack.com/query/v4/docs/react/overview)
- UI toolkit: [React Native Elements](https://reactnativeelements.com/)

## Solution structure

There are many ways to structure a React Native project. I've decided to structure it by type. In this way, the `src` folder looks like this:

    ├── assets                  # Where we store static files (images, fonts, files...)
    │   ├── fonts
    │   └── img
    ├── components              # Generic re-usable components
    ├── errors                  # Custom errors / exceptions
    ├── interceptors            # Files which are meant to intercept http requests / responses
    ├── navigation              # Files which are related to the navigation / routing https://reactnavigation.org/
    ├── providers               # Files that provide common functionalities or utilities that are used throughout the app.
    ├── screens                 # Where we store all screen files
    ├── services                # Files that handle interactions with APIs
    │   └── clients
    └── styles                  # Generic / global styles

### Interesting files in root

#### app.config.ts

Configuration file. We define there all the environment configuration (endpoints) and the [Expo config](https://docs.expo.dev/versions/latest/config/app/)

#### App.tsx

Main file of the app. We initialize data, register providers, wrappers, navigation...

#### eas.json

Configuration file for EAS CLI and services. More info at https://docs.expo.dev/build/eas-json/

---

## Prerequisites

This project uses [Expo CLI](https://docs.expo.dev/more/expo-cli/) that it's installed automatically by `npm`.

ℹ For more info concerning Expo installation, follow docs https://docs.expo.dev/get-started/installation/

## Run Locally

Clone the project

```bash
  git clone https://github.com/Estevete/hiberus.git
```

Go to the project directory

```bash
  cd hiberus
```

Install dependencies

```bash
  npm install
```

If you want to test it with a real device (Recommended), then Expo Go must be downloaded from the [AppStore](https://apps.apple.com/us/app/expo-go/id982107779) / [PlayStore](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=es_PY&pli=1)

Start the Expo server

```bash
  npx expo start
```

Open the Expo Go app and connect to your local expo server (⚠**YOU MUST BE CONNECTED TO THE SAME NETWORK**)

---

To test it with an iOS simulator, follow [Expo docs prerequisites](https://docs.expo.dev/guides/local-app-development/#ios) and run

```bash
  npx expo run:ios
```

To test it with an Android simulator, follow [Expo docs prerequisites](https://docs.expo.dev/guides/local-app-development/#android) and run

```bash
  npx expo run:android
```
