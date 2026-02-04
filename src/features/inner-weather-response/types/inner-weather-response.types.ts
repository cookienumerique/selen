import { InnerWeather } from '@/src/features/inner-weather/types/inner-weather.types';
import { User } from '@/src/features/user/types/user.types';

export type InnerWeatherResponse = {
  id: string;
  innerWeather: InnerWeather;
  author: User;
  createdAt: string;
  day: string;
};
