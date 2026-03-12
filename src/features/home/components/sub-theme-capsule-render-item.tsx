import { ProgressRing } from '@/src/components/progress/progress-circle';
import { Text } from '@/src/components/texts';
import { env } from '@/src/config/env';
import { Colors } from '@/src/constants/theme';
import { HomeCard } from '@/src/features/home/components/home-card';
import { SubThemeCompletedModal } from '@/src/features/home/components/sub-theme-completed-modal';
import { SubThemeCapsuleWithProgress } from '@/src/features/sub-theme-capsule/types/sub-theme-capsule-with-progress.types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

import { ImageBackground, TouchableOpacity, View } from 'react-native';
type SubThemeCapsuleRenderItemProps = {
  subThemesWithProgress: SubThemeCapsuleWithProgress;
};
export const SubThemeCapsuleRenderItem = ({
  subThemesWithProgress,
}: SubThemeCapsuleRenderItemProps) => {
  const { subThemeCapsule, isCompleted, answeredCapsules, totalCapsules } = subThemesWithProgress;
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);
  const source = subThemeCapsule.image
    ? { uri: `${env.SELEN_API}/media/${subThemeCapsule.image}` }
    : require('@/assets/images/surprise-capsule-background.png');

  const handlePressOnSubThemeCapsule = () => {
    if (isCompleted) {
      setIsCompletedModalVisible(true);
      return;
    };
    router.navigate(`/capsule/open-capsule-screen?id=${subThemeCapsule.id}`);
  };
  return (
    <TouchableOpacity onPress={handlePressOnSubThemeCapsule}>
      <HomeCard
        style={{
          padding: 0,
          borderRadius: 16,
          overflow: 'hidden',
          height: 120,
          width: 120,
        }}
      >
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
          <View style={{ width: '100%', padding: 8, flexDirection: 'row', gap: 4 }}>
            <Text style={{ width: '80%', fontSize: 12, color: 'white' }}>
              {subThemeCapsule.name}
            </Text>
            <View style={{ justifyContent: 'flex-end' }}>
              {!isCompleted && <ProgressRing
                total={totalCapsules}
                currentValue={answeredCapsules}
                size={16}
              />}
              {isCompleted && <Ionicons name="checkmark-circle" size={20} color={Colors.sageMist} />}
            </View>
          </View>
        </ImageBackground>
      </HomeCard>
      <SubThemeCompletedModal
        visible={isCompletedModalVisible}
        onClose={() => setIsCompletedModalVisible(false)}
        subThemeCapsule={subThemeCapsule} />
    </TouchableOpacity>
  );
};
