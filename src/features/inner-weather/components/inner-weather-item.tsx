import { Colors } from "@/src/constants/theme";
import { InnerWeather, InnerWeatherFormValues } from "@/src/features/inner-weather/types/inner-weather.types";
import { getInnerWeatherAsset } from "@/src/features/inner-weather/utils/get-inner-weather-asset";
import { useFormContext } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";

type InnerWeatherItemProps = {
    innerWeather: InnerWeather;
};

export const InnerWeatherItem = ({ innerWeather }: InnerWeatherItemProps) => {
    const form = useFormContext<InnerWeatherFormValues>();
    const { innerWeather: innerWeatherFormValue } = form.watch();
    const handleSelectWeather = () => {
        form.setValue('innerWeather', innerWeather, { shouldDirty: true, shouldValidate: true });
    }
    const SIZE = 100;
    return (
        <TouchableOpacity onPress={handleSelectWeather}
            style={{
                flex: 1,
                alignItems: 'center',
                gap: 16,
            }}>

            <View
                style={{
                    borderWidth: innerWeatherFormValue?.id === innerWeather.id ? 4 : 0,
                    opacity: innerWeatherFormValue?.id === innerWeather.id ? 1 : 0.6,
                    borderColor: Colors.sageMistDark,
                    width: SIZE,
                    height: SIZE,
                    borderRadius: SIZE / 2,
                    backgroundColor: Colors.sageMist,
                }}
            />
            <Image
                source={getInnerWeatherAsset(innerWeather)}
                style={{
                    position: 'absolute',
                    top: 15,
                    height: 70,
                    resizeMode: 'contain',
                }}
            />
            <Text
                style={{ fontSize: 16, textAlign: 'center', color: Colors.slateRoot }}
            >
                {innerWeather.name}
            </Text>
        </TouchableOpacity>
    );
};