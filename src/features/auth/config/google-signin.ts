import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId:
      '405749262108-fhgp2iaesnusdmufclga1nb5n8c4qobi.apps.googleusercontent.com',
    offlineAccess: true,
  });
}
