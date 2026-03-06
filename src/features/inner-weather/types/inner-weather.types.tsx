export enum InnerWeatherCodeEnum {
  SUNNY = 'SUNNY',
  CLEAR = 'CLEAR',
  SOFT = 'SOFT',
  FOGGY = 'FOGGY',
  TENSE = 'TENSE',
  OVERWHELMED = 'OVERWHELMED',
}

export type InnerWeather = {
  id: string;
  code: InnerWeatherCodeEnum;
  name: string;
  day: string;
  createdAt: string;
};

export type InnerWeatherFormValues = {
  innerWeather: InnerWeather | undefined;
};
