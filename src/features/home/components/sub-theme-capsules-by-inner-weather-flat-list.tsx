import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { SubThemeCapsuleRenderItem } from '@/src/features/home/components/sub-theme-capsule-render-item';
import { useSubThemes } from '@/src/features/home/hooks/use-sub-theme';
import { useFetchInnerWeathersResponses } from '@/src/features/inner-weather-response/hooks/use-fetch-inner-weathers-responses';
import { getSubThemesByInnerWeatherCode } from '@/src/features/inner-weather-response/utils/get-sub-themes-by-inner-weather-code';
import dayjs from 'dayjs';
import { ActivityIndicator, FlatList, View } from 'react-native';

export const SubThemeCapsulesByInnerWeatherFlatList = () => {
  const { data: innerWeather, isLoading: isLoadingInnerWeather } = useFetchInnerWeathersResponses({
    params: { day: dayjs().format('YYYY-MM-DD') },
  });
  const [innerWeatherOfDay] = innerWeather || [];
  const subThemes = getSubThemesByInnerWeatherCode(innerWeatherOfDay?.innerWeather?.code);
  const { getSubThemesWithProgressByCodes, isLoading: isLoadingSubThemes } = useSubThemes();
  const subThemesWithProgress = getSubThemesWithProgressByCodes(subThemes);
  const isLoading = isLoadingInnerWeather || isLoadingSubThemes;

  if (!innerWeatherOfDay || !innerWeatherOfDay && !isLoading) {
    return null
  }
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
        Selon ton humeur
      </Text>

      {isLoading && (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      )}
      {!isLoading && (
        <FlatList
          data={subThemesWithProgress}
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
