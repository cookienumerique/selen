import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { SubThemeCapsuleRenderItem } from '@/src/features/home/components/sub-theme-capsule-render-item';
import { useSubThemes } from '@/src/features/home/hooks/use-sub-theme';
import { ActivityIndicator, FlatList, View } from 'react-native';

export const TopSubThemeCapsulesFlatList = () => {

  const { getSubThemesWithProgressByCodes, isLoading } = useSubThemes();
  const topSubThemeCapsules = getSubThemesWithProgressByCodes(['GRATITUDE', 'TIME_AND_URGENCY', 'MONEY_AND_WORTH']);

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
        Top 3 France
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
