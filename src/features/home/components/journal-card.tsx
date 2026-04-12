import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { HomeCard } from '@/src/features/home/components/home-card';
import { router } from 'expo-router';
import { ImageBackground, TouchableOpacity, View } from 'react-native';

export const JournalCard = () => {
  const handlePressOnSurpriseCapsule = () => {
    router.navigate('/journal');
  };
  return (
    <TouchableOpacity
      onPress={handlePressOnSurpriseCapsule}
      style={{ flex: 1 }}
    >
      <HomeCard
        style={{
          padding: 0,
          borderRadius: 16,
          overflow: 'hidden',
          height: 120,
          width: '100%',
        }}
      >
        <ImageBackground
          source={require('@/assets/images/home/journal-card.png')}
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontSize: 10,
              backgroundColor: Colors.sageMist,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              zIndex: 1,
              color: 'black'
            }}
          >
            Version bêta
          </Text>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%',
              padding: 8,
              backgroundColor: 'black',
              opacity: 0.4,
            }}
          />
          <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
                gap: 4
              }}
            >
              Ton journal intime
            </Text>
            <Text style={{ fontSize: 12, color: 'white' }}>Écris et la lune te répond.</Text>
          </View>
        </ImageBackground>
      </HomeCard>
    </TouchableOpacity >
  );
};
