import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { SubThemeCapsuleRenderItem } from '@/src/features/home/components/sub-theme-capsule-render-item';
import { useFetchSubThemeCapsules } from '@/src/features/sub-theme-capsule/hooks/use-fetch-sub-theme-capsules';
import { ActivityIndicator, FlatList, View } from 'react-native';

export const TopSubThemeCapsulesFlatList = () => {
  const { data: topSubThemeCapsules, isLoading } = useFetchSubThemeCapsules({
    params: {
      code: 'SUCCESS_DECONSTRUCTION,SELF_WORTH,CHILD_AS_MIRROR,SHADOW_SELF,LIFE_TRANSITIONS',
    },
  });

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
        Top 5 France
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
            <SubThemeCapsuleRenderItem key={item.id} subThemeCasule={item} />
          )}
        />
      )}
    </View>
  );
};
