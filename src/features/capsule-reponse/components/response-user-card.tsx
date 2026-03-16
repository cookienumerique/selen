import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Corner } from '@/src/features/capsule-answered/components/corner';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import React from 'react';
import { View } from 'react-native';

type ResponseUserCardProps = {
    capsuleResponse: CapsuleResponse;
    variant?: 'dark' | 'light';
};
export const ResponseUserCard = (props: ResponseUserCardProps) => {
    const { capsuleResponse, variant = 'light' } = props;
    const backgroundColor = variant === 'dark' ? Colors.slateRoot : Colors.linenCloud;
    const color = variant === 'dark' ? Colors.linenCloud : Colors.slateRoot;
    return (
        <View
            style={{
                borderWidth: 2,
                borderColor: color,
                position: 'relative',
                backgroundColor,
                borderRadius: 16,
                paddingHorizontal: 40,
                paddingVertical: 40,
                minHeight: 220,
            }}
        >
            <Corner style={{ top: 16, left: 16, transform: [{ rotate: '270deg' }] }} color={color} />
            <Corner style={{ top: 16, right: 16, transform: [{ rotate: '0deg' }] }} color={color} />
            <Corner style={{ bottom: 16, right: 16, transform: [{ rotate: '90deg' }] }} color={color} />
            <Corner style={{ bottom: 16, left: 16, transform: [{ rotate: '180deg' }] }} color={color} />
            <View style={{
                gap: 16,
            }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Text variant="bold" family="seasons" style={{ fontSize: 16, color, textAlign: 'center' }}>Ce que tu as écrit</Text>
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        color,
                        textAlign: 'center',
                    }}
                >
                    &quot;{capsuleResponse?.response}&quot;
                </Text>
            </View>
        </View >
    );
};
