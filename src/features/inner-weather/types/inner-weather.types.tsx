export type InnerWeather = {
    id: string;
    code: 'SUNNY' | 'CLEAR' | 'SOFT' | 'FOGGY' | 'TENSE' | 'OVERWHELMED';
    name: string
    day: string;
    createdAt: string;
};

export type InnerWeatherFormValues = {
    innerWeather: InnerWeather | undefined;
}