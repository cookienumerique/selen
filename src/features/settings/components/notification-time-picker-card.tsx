import { Card } from '@/src/components/card';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { NotificationFormValues } from '@/src/features/settings/hooks/use-notification-form';
import React, { useEffect, useRef } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { Animated, TextInput, View } from 'react-native';


type NotificationTimePickerCardProps = {
    control: Control<NotificationFormValues>;
}
export const NotificationTimePickerCard = ({ control }: NotificationTimePickerCardProps) => {
    const isEnabled = useWatch({ control, name: 'isSubscribed' });

    const fadeAnim = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

    const fontSize = 36;
    const width = 50;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isEnabled ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, isEnabled]);

    if (!isEnabled) return null;

    return (
        <Animated.View style={{ opacity: fadeAnim, pointerEvents: isEnabled ? 'auto' : 'none' }}>
            <Card>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.oakHoneyDark }}>
                            Heure du rappel
                        </Text>
                        <Text style={{ fontSize: 12, color: Colors.slateRoot, marginTop: 4 }}>
                            Chaque jour à cette heure
                        </Text>
                    </View>
                    {isEnabled && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <Controller
                                control={control}
                                name="hours"
                                render={({ field }) => (
                                    <TextInput
                                        value={field.value}
                                        onChangeText={(v) => field.onChange(v)}
                                        onBlur={() => {
                                            const num = Number(field.value);
                                            if (isNaN(num) || field.value === '') {
                                                field.onChange('00');
                                                return;
                                            }
                                            field.onChange(Math.min(59, Math.max(0, num)).toString().padStart(2, '0'));
                                        }}
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        style={{
                                            fontSize,
                                            fontWeight: 'bold',
                                            color: Colors.oakHoneyDark,
                                            textAlign: 'center',
                                            width,
                                        }}
                                    />
                                )}
                            />

                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.oakHoneyDark, lineHeight: 24 }}>:</Text>
                            <Controller
                                control={control}
                                name="minutes"
                                render={({ field }) => (
                                    <TextInput
                                        value={field.value}
                                        onChangeText={(v) => field.onChange(v)}
                                        onBlur={() => {
                                            const num = Number(field.value);
                                            if (isNaN(num) || field.value === '') {
                                                field.onChange('00');
                                                return;
                                            }
                                            field.onChange(Math.min(59, Math.max(0, num)).toString().padStart(2, '0'));
                                        }}
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        style={{
                                            fontSize,
                                            fontWeight: 'bold',
                                            color: Colors.oakHoneyDark,
                                            textAlign: 'center',
                                            width,
                                        }}
                                    />
                                )}
                            />
                        </View>
                    )}
                </View>
            </Card>
        </Animated.View >
    )
}