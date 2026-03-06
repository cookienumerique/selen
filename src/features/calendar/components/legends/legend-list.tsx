import { Card } from '@/src/components/card';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { LegendItem } from '@/src/features/calendar/components/legends/legend-item';
import { useFetchInnerWeathers } from '@/src/features/inner-weather/hooks/use-fetch-inner-weathers';
import { InnerWeather, InnerWeatherCodeEnum } from '@/src/features/inner-weather/types/inner-weather.types';
import { getInnerWeatherColor } from '@/src/features/inner-weather/utils/get-inner-weather-color';
import { ActivityIndicator, View } from 'react-native';

export const LegendList = () => {
  const { data: innerWeathers, isLoading: isLoadingInnerWeathers } =
    useFetchInnerWeathers();
  if (isLoadingInnerWeathers) return <ActivityIndicator />;

  const getInnerWeatherByCode = (code: InnerWeather['code']) => {
    return innerWeathers?.find((innerWeather) => innerWeather.code === code);
  };
  return (
    <Card
      style={{
        gap: 8,
      }}
    >
      <Text
        style={{ fontSize: 16, fontWeight: 'bold', color: Colors.oakHoneyDark }}
      >
        Legendes:
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'space-between',
        }}
      >
        <LegendItem color={Colors.capsule} name="Capsule ouverte" />
        <LegendItem
          color={getInnerWeatherColor(InnerWeatherCodeEnum.SUNNY)}
          name={getInnerWeatherByCode(InnerWeatherCodeEnum.SUNNY)?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor(InnerWeatherCodeEnum.CLEAR)}
          name={getInnerWeatherByCode(InnerWeatherCodeEnum.CLEAR)?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor(InnerWeatherCodeEnum.SOFT)}
          name={getInnerWeatherByCode(InnerWeatherCodeEnum.SOFT)?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor(InnerWeatherCodeEnum.FOGGY)}
          name={getInnerWeatherByCode(InnerWeatherCodeEnum.FOGGY)?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor(InnerWeatherCodeEnum.TENSE)}
          name={getInnerWeatherByCode(InnerWeatherCodeEnum.TENSE)?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor(InnerWeatherCodeEnum.OVERWHELMED)}
          name={getInnerWeatherByCode(InnerWeatherCodeEnum.OVERWHELMED)?.name ?? ''}
        />
      </View>
    </Card>
  );
};
