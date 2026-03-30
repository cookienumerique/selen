import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { SubThemeCapsuleRenderItem } from '@/src/features/home/components/sub-theme-capsule-render-item';
import { useSubThemes } from '@/src/features/home/hooks/use-sub-theme';
import { ActivityIndicator, FlatList, View } from 'react-native';

export const SubThemeOfTheMomentFlatList = () => {
  const { getSubThemesWithProgressByCodes, isLoading } = useSubThemes();
  const topSubThemeCapsules = getSubThemesWithProgressByCodes(['INNER_CHILD', 'SHADOW_SELF', 'LIFE_TRANSITIONS', 'SUCCESS_DECONSTRUCTION', 'SELF_WORTH', 'PAUSE_MODE', 'SELF_DISCONNECTION', 'POSSIBLE_SPACE', 'CHILD_AS_MIRROR', 'MENTAL_LOAD', 'BOUNDARIES_AND_RELATIONSHIPS', 'LIFE_AFTER_GRIEF', 'DIGITAL_OVERLOAD_AVOIDANCE', 'GROUNDING_AND_BODY', 'PERSONAL_GROWTH_TRUCE', 'BECOMING_PARENT_STORM', 'MONEY_AND_WORTH', 'CHOSEN_VS_IMPOSED_SOLITUDE', 'COUPLE_CRISIS_REBUILD', 'GRATITUDE', 'TIME_AND_URGENCY', 'ADDICTIONS_AND_DEPENDENCIES', 'SELF_COMPASSION_GROWTH']);

  return (
    <View style={{ gap: 16 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: Colors.warmSand,
          textAlign: 'left',
        }}
      >
        Les thèmes du moment
      </Text>

      {isLoading && (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      )}
      {!isLoading && (
        <FlatList
          data={topSubThemeCapsules}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <SubThemeCapsuleRenderItem key={item.subThemeCapsule.id} subThemesWithProgress={item} />
          )}
        />
      )}
    </View>
  );
};
