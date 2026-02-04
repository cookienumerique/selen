import { InnerWeather } from '@/src/features/inner-weather/types/inner-weather.types';

export const getInnerWeatherColor = (
  innerWeatherCode: InnerWeather['code'],
) => {
  switch (innerWeatherCode) {
    case 'SUNNY':
      return '#FBC02D';
    case 'CLEAR':
      return '#9BDCE4';
    case 'SOFT':
      return '#D4A5A5';
    case 'FOGGY':
      return '#A7B7C0';
    case 'TENSE':
      return '#A62C11';
    case 'OVERWHELMED':
      return '#D1E8E4';
    default:
      return '#A7B7C0';
  }
};
