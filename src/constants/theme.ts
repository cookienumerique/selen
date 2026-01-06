/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Colors = {
  sageMist: "#b6c8a9", // green
  slateRoot: "#2f3e46", // blue
  linenCloud: "#e8e2d9", // grey
  warmSand: "#f5e3c8", // brown
  oakHoney: "#b99779", // beige
  oakHoneyDark: "#5c4633", // dark beige
  gray: "#696969",
};

export const Fonts = Platform.select({
  ios: {
    sans: "OpenSans-Regular",
    sansBold: "OpenSans-Bold",
  },
  android: {
    sans: "OpenSans-Regular",
    sansBold: "OpenSans-Bold",
  },
  default: {
    sans: "OpenSans-Regular",
    sansBold: "OpenSans-Bold",
  },
  web: {
    sans: "OpenSans-Regular",
    sansBold: "OpenSans-Bold",
  },
});
