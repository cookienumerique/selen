import { Card } from '@/src/components/card';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { LegendItem } from '@/src/features/calendar/components/legends/legend-item';
import { useFetchInnerWeathers } from '@/src/features/inner-weather/hooks/use-fetch-inner-weathers';
import { InnerWeather } from '@/src/features/inner-weather/types/inner-weather.types';
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
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'space-between',
      }}>
        <LegendItem color={Colors.capsule} name="Capsule ouverte" />
        <LegendItem
          color={getInnerWeatherColor('SUNNY')}
          name={getInnerWeatherByCode('SUNNY')?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor('CLEAR')}
          name={getInnerWeatherByCode('CLEAR')?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor('SOFT')}
          name={getInnerWeatherByCode('SOFT')?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor('FOGGY')}
          name={getInnerWeatherByCode('FOGGY')?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor('TENSE')}
          name={getInnerWeatherByCode('TENSE')?.name ?? ''}
        />
        <LegendItem
          color={getInnerWeatherColor('OVERWHELMED')}
          name={getInnerWeatherByCode('OVERWHELMED')?.name ?? ''}
        />
      </View>

    </Card>
  );
};
