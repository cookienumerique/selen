import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { Colors } from '@/src/constants/theme';
import { useCreateInnerWeatherResponse } from '@/src/features/inner-weather-response/hooks/use-create-inner-weather-response';
import { InnerWeatherItem } from '@/src/features/inner-weather/components/inner-weather-item';
import { useFetchInnerWeathers } from '@/src/features/inner-weather/hooks/use-fetch-inner-weathers';
import { useInnerWeatherForm } from '@/src/features/inner-weather/hooks/use-inner-weather-form';
import { useInnerWeatherModal } from '@/src/features/inner-weather/hooks/use-inner-weather-modal';
import { InnerWeather, InnerWeatherFormValues } from '@/src/features/inner-weather/types/inner-weather.types';
import { chunkArray } from '@/src/utils/array/chunk-array';
import { Entypo } from '@expo/vector-icons';
import { FormProvider } from 'react-hook-form';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

export const InnerWeatherModal = () => {
    const { isVisible, setIsVisible } = useInnerWeatherModal();
    const { data: innerWeathers, isPending: isPendingFetchInnerWeathers } = useFetchInnerWeathers();
    const rows = chunkArray<InnerWeather>(innerWeathers || [], 3);
    // slip array in 3 items arrays
    const { mutate: createInnerWeather, isPending } = useCreateInnerWeatherResponse({
        onSuccess: () => {
            setIsVisible(false);
        },
        onError: (error) => {
            console.error(error);
            Toast.show({
                type: 'error',
                position: 'bottom',
                autoHide: false,
                text1: 'Erreur lors de la création de la météo intérieure',
            });
        }
    });

    const form = useInnerWeatherForm();
    const onSubmit = ({ innerWeather }: InnerWeatherFormValues) => {
        if (!innerWeather) return;
        createInnerWeather({ innerWeatherId: innerWeather.id });
        setIsVisible(false);
    }
    return (
        <Modal visible={isVisible}>
            <FormProvider {...form}>
                <Container>
                    <View style={{ height: '100%', gap: 16 }}>
                        <Header />
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                backgroundColor: Colors.linenCloud,
                                gap: 64,
                                borderRadius: 16,
                                paddingTop: 64,
                                paddingBottom: 16,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: Colors.slateRoot,
                                }}
                            >
                                Sélectionne en une bulle ton ciel du moment :
                            </Text>

                            {isPendingFetchInnerWeathers && <ActivityIndicator size="small" color={Colors.sageMistDark} />}
                            <View style={{ gap: 32 }}>
                                {rows.map((row, rowIndex) => (
                                    <View key={rowIndex} style={{ flexDirection: 'row', gap: 32 }}>
                                        {row.map(innerWeather => (<InnerWeatherItem
                                            key={innerWeather.id}
                                            innerWeather={innerWeather}
                                        />))}
                                    </View>
                                ))}
                            </View>

                            <Button
                                disabled={!form.formState.isValid || isPending}
                                onPress={form.handleSubmit(onSubmit)}
                                style={{
                                    width: '100%',
                                    marginTop: 'auto',
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 18 }}>Continuer</Text>
                                {isPending && <ActivityIndicator size="small" color="white" />}
                                <Entypo name="chevron-right" size={24} color="white" />
                            </Button>
                        </View>
                    </View>
                </Container>
            </FormProvider>
        </Modal >
    );
};
