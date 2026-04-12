import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { SubThemeCapsuleRenderItem } from '@/src/features/home/components/sub-theme-capsule-render-item';
import { useSubThemes } from '@/src/features/home/hooks/use-sub-theme';
import { useFetchInnerWeathersResponses } from '@/src/features/inner-weather-response/hooks/use-fetch-inner-weathers-responses';
import { getSubThemesByInnerWeatherCode } from '@/src/features/inner-weather-response/utils/get-sub-themes-by-inner-weather-code';
import { getInnerWeatherAsset } from '@/src/features/inner-weather/utils/get-inner-weather-asset';
import dayjs from 'dayjs';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';

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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: Colors.warmSand,
          }}
        >
          Parce que ton humeur est :
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, backgroundColor: Colors.warmSand, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
          <Text style={{ fontSize: 14, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            {innerWeatherOfDay?.innerWeather?.name}
          </Text>
          <Image
            source={getInnerWeatherAsset(innerWeatherOfDay.innerWeather)}
            style={{
              alignSelf: 'center',
              width: 20,
              height: 20,
            }}
          />
        </View>
      </View>
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
