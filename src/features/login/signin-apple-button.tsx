import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { env } from '@/src/config/env';
import { useAppleLogIn } from '@/src/features/auth/hooks/use-apple-login';
import { FontAwesome } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { TouchableOpacity, View } from 'react-native';

export const SignInAppleButton = () => {
  const { login, isLoading, error } = useAppleLogIn();
  const handleAppleLogin = async () => {
    login();
  };

  const handleContactSupport = async () => {
    try {
      await MailComposer.composeAsync({
        recipients: [env?.SUPPORT_MAIL],
        subject: "Message depuis l'application SELEN",
        body: 'Tapez votre message ici...',
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ gap: 16, width: '100%' }}>
      <View style={{ borderRadius: 24, overflow: 'hidden', gap: 16 }}>
        <Button
          onPress={handleAppleLogin}
          disabled={isLoading}
          style={{
            backgroundColor: 'black',
          }}
        >
          <FontAwesome name="apple" size={20} color="white" />
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
            }}
          >
            Se connecter avec Apple
          </Text>
        </Button>
      </View>
      {error && (
        <TouchableOpacity onPress={handleContactSupport}>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#fc8181',
              backgroundColor: '#fff5f5',
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#c53030',
              }}
            >
              Une erreur est survenue lors de la connexion
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#c53030',
              }}
            >
              Contactez notre support pour plus d&apos;informations
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
