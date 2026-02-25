import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { useFetchOpenedCapsulesResponse } from '@/src/features/home/hooks/use-fetch-opened-capsules-response';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';



export const TotalCapsulesOpened = () => {
    const { data, isLoading } = useFetchOpenedCapsulesResponse();
    const { total: totalCapsulesResponse } = data ?? {};

    const anim = useRef(new Animated.Value(0)).current;
    const [nbCapsulesResponsesOpened, setDisplayValue] = useState(0);


    useEffect(() => {
        if (isLoading || !totalCapsulesResponse) return;
        // reset + animation vers la valeur cible
        anim.stopAnimation();
        anim.setValue(0);

        const id = anim.addListener(({ value }) => {
            // arrondi entier
            setDisplayValue(Math.round(value));
        });

        Animated.timing(anim, {
            toValue: Math.max(0, totalCapsulesResponse),
            duration: 2000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false, // on anime une valeur JS affichée en texte
        }).start();

        return () => {
            anim.removeListener(id);
        };
    }, [anim, totalCapsulesResponse, isLoading, data]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <FontAwesome6 name="hands-holding-circle" size={12} color={Colors.warmSand} />
            <Text style={{ fontSize: 12, color: Colors.warmSand, textAlign: 'right' }}>
                Ensemble, déjà <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{nbCapsulesResponsesOpened.toLocaleString('fr-FR')}</Text> capsules ouvertes
            </Text>
        </View >
    );
};