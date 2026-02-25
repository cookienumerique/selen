import { Text } from '@/src/components/texts';
import { env } from '@/src/config/env';
import { HomeCard } from '@/src/features/home/components/home-card';
import { SubThemeCapsule } from '@/src/features/sub-theme-capsule/types/sub-theme-capsule.types';
import { router } from 'expo-router';

import { ImageBackground, TouchableOpacity, View } from 'react-native';
type SubThemeCapsuleRenderItemProps = {
  subThemeCasule: SubThemeCapsule;
};
export const SubThemeCapsuleRenderItem = ({
  subThemeCasule,
}: SubThemeCapsuleRenderItemProps) => {
  const source = subThemeCasule.image
    ? { uri: `${env.SELEN_API}/media/${subThemeCasule.image}` }
    : require('@/assets/images/surprise-capsule-background.png');

  const handlePressOnSubThemeCapsule = () => {
    router.navigate(`/capsule/open-capsule-screen?id=${subThemeCasule.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePressOnSubThemeCapsule}>
      <HomeCard style={{ padding: 0, borderRadius: 16, overflow: 'hidden', height: 120, width: 120 }}>
        <ImageBackground
          source={source}
          resizeMode="cover"
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            gap: 8,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%',
              padding: 8,
              backgroundColor: 'black',
              opacity: 0.3,
            }}
          />
          <View style={{ padding: 8 }}>
            <Text style={{ fontSize: 12, color: 'white' }}>
              {subThemeCasule.name}
            </Text>
          </View>
        </ImageBackground>
      </HomeCard>
    </TouchableOpacity>
  );
};
