import { InnerWeather } from '../types/inner-weather.types';

export const getInnerWeatherAsset = (weather: InnerWeather) => {
  switch (weather.code) {
    case 'SUNNY':
      return require('@/assets/images/inner-weather/sunny.png');
    case 'CLEAR':
      return require('@/assets/images/inner-weather/clear.png');
    case 'SOFT':
      return require('@/assets/images/inner-weather/soft.png');
    case 'FOGGY':
      return require('@/assets/images/inner-weather/foggy.png');
    case 'TENSE':
      return require('@/assets/images/inner-weather/tense.png');
    case 'OVERWHELMED':
      return require('@/assets/images/inner-weather/overwhelmed.png');
    default:
      return require('@/assets/images/inner-weather/default.png');
  }
};
