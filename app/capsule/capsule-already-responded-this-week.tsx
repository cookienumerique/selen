import HomeButton from '@/src/components/button/home-button';
import { Colors } from '@/src/constants/theme';
import { ExploreInfinityButton } from '@/src/features/subscription/components/explor-infinity-button';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function CapsuleAlreadyRespondedThisWeek() {
  const handleDiscoverInfinite = () => {
    router.push('/subscription');
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 64,
          marginHorizontal: 16,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: Colors.slateRoot,
            textAlign: 'center',
            letterSpacing: 0.5,
          }}
        >
          Ton cycle de 3 capsules hebdomadaires est complet
        </Text>
        <View style={{ gap: 32 }}>
          <Text
            style={{
              fontSize: 20,
              color: Colors.oakHoneyDark,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Tes 3 capsules sont maintenant précieusement conservées.
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.oakHoneyDark,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Envie de ne pas t&apos;arrêter là ?{'\n'}
            Avec Selen infini, ne laisse aucune pensée de côté et accède à ta capsule chaque jour de la semaine.
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Colors.oakHoneyDark,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Tu pourras aussi les modifier ou supprimer en cas de besoin.
          </Text>
        </View>
      </View>
      <View style={{ gap: 16 }}>
        <ExploreInfinityButton />
        <HomeButton />
      </View>

    </>
  );
}
