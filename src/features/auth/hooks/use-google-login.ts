import { useUser } from "@/src/contexts/use-user";
import { auth } from "@/src/features/auth/config/firebase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential,
} from "firebase/auth";
import { useState } from "react";

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { setUserStorage } = useUser();
  const login = async (): Promise<UserCredential | undefined> => {
    setIsLoading(true);
    setError(null);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    try {
      const result = await GoogleSignin.signIn();
      if (!result.data?.idToken) {
        throw new Error("Google Sign-In failed: No idToken returned");
      }
      const idToken = result.data?.idToken;
      // Transforme en credential Firebase
      const credential = GoogleAuthProvider.credential(idToken);

      // Connecte Firebase
      const userCredential = await signInWithCredential(auth, credential);
      const user = {
        id: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        avatar: userCredential.user.photoURL,
      };
      setUserStorage(user);
    } catch (error: any) {
      setError(error);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
