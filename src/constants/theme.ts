/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  sageMist: '#b8c6a9', // green
  sageMistDark: '#889e70', // green dark
  slateRoot: '#2f3e46', // blue
  linenCloud: '#f5e3c8', // grey
  warmSand: '#f5e3c8', // beige clair
  oakHoney: '#b99779', // marron clair
  oakHoneyDark: '#5c4633', // marron foncé
  gray: '#878787',
  orange: '#ffa500',
  gold: '#ffd700',
  capsule: '#6F8F72',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'OpenSans-Regular',
    sansBold: 'OpenSans-Bold',
  },
  android: {
    sans: 'OpenSans-Regular',
    sansBold: 'OpenSans-Bold',
  },
  default: {
    sans: 'OpenSans-Regular',
    sansBold: 'OpenSans-Bold',
  },
  web: {
    sans: 'OpenSans-Regular',
    sansBold: 'OpenSans-Bold',
  },
});
