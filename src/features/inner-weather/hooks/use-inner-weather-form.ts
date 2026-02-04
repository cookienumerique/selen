import { InnerWeatherFormValues } from '@/src/features/inner-weather/types/inner-weather.types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useInnerWeatherForm = () => {
  const form = useForm<InnerWeatherFormValues>({
    defaultValues: {
      innerWeather: undefined,
    },
    mode: 'onChange',
    shouldUnregister: false,
  });

  useEffect(() => {
    form.register('innerWeather', {
      required: true,
    });
  }, [form]);

  return form;
};
