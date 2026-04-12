import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Corner } from '@/src/features/capsule-answered/components/corner';
import React from 'react';
import { View } from 'react-native';

type ResponseMoonProps = {
    response: string;
    variant?: 'dark' | 'light';
};
export const ResponseMoon = (props: ResponseMoonProps) => {
    const { response, variant = 'light' } = props;
    const backgroundColor = variant === 'dark' ? Colors.slateRoot : Colors.linenCloud;
    const color = variant === 'dark' ? Colors.linenCloud : Colors.slateRoot;
    return (
        <View
            style={{
                position: 'relative',
                backgroundColor,
                borderRadius: 16,
                paddingHorizontal: 40,
                paddingVertical: 40,
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
                    <View style={{ backgroundColor: Colors.sateRootLight, borderRadius: 100, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12 }}>🌙</Text>
                    </View>
                    <Text variant="bold" family="seasons" style={{ fontSize: 16, color, textAlign: 'center' }}>La réponse de la lune {` `}</Text>
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        color,
                        textAlign: 'center',
                    }}
                >
                    &quot;{response}&quot;
                </Text>
            </View>
        </View >
    );
};
