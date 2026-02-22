import { Button } from '@/src/components/button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export const ExploreInfinityButton = () => {
  const handleDiscoverInfinite = () => {
    router.push('/subscription');
  };
  return (
    <Button onPress={handleDiscoverInfinite}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Ionicons name="sparkles" size={12} color="white" />
        <Text style={{ color: 'white' }}>Explorer l&apos;infini</Text>
      </View>
    </Button>
  );
};
