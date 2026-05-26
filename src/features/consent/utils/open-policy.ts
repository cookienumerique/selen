import * as Clipboard from 'expo-clipboard';
import * as WebBrowser from 'expo-web-browser';
import Toast from 'react-native-toast-message';

export const PRIVACY_POLICY_URL =
  'https://instantselen.fr/politique-de-confidentialite';

export const openPolicy = async (): Promise<void> => {
  try {
    await WebBrowser.openBrowserAsync(PRIVACY_POLICY_URL);
  } catch {
    await Clipboard.setStringAsync(PRIVACY_POLICY_URL);
    Toast.show({
      type: 'info',
      text1: 'On ne peut pas ouvrir le navigateur',
      text2:
        "L'adresse a été copiée — tu peux la coller dans n'importe quel navigateur.",
      position: 'bottom',
      visibilityTime: 6000,
    });
  }
};
