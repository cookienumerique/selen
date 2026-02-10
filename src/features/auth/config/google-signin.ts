import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignIn() {
  GoogleSignin.configure({
    iosClientId:
      '405749262108-n3fmgndc8d6sve5j9nj9tea4vket9omb.apps.googleusercontent.com',
    webClientId:
      '405749262108-fhgp2iaesnusdmufclga1nb5n8c4qobi.apps.googleusercontent.com',
    offlineAccess: true,
  });
}
