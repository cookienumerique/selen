import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { HomeCard } from '@/src/features/home/components/home-card';
import { useFetchInnerWeathersResponses } from '@/src/features/inner-weather-response/hooks/use-fetch-inner-weathers-responses';
import { getInnerWeatherAsset } from '@/src/features/inner-weather/utils/get-inner-weather-asset';
import dayjs from 'dayjs';
import { ActivityIndicator, Image } from 'react-native';

export const InnerWeatherCard = () => {
  const { data: innerWeather, isLoading } = useFetchInnerWeathersResponses({
    params: { day: dayjs().format('YYYY-MM-DD') },
  });

  const [innerWeatherOfDay] = innerWeather || [];
  const item = {
    id: 'inner-weather',
    title: 'Ta météo\n intérieure',
    description: innerWeatherOfDay?.innerWeather?.name,
    image:
      !innerWeatherOfDay || isLoading
        ? ''
        : getInnerWeatherAsset(innerWeatherOfDay.innerWeather),
  };
  return (
    <HomeCard>
      {isLoading && (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      )}
      {!isLoading && (
        <>
          <Image
            source={item.image}
            style={{
              alignSelf: 'center',
              width: 40,
              height: 40,
            }}
          />
          <Text
            style={{
              textAlign: 'left',
              fontSize: 12,
              color: Colors.oakHoneyDark,
            }}
          >
            {item.title}
          </Text>
        </>
      )}
    </HomeCard>
  );
};
