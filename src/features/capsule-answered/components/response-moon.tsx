import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Corner } from '@/src/features/capsule-answered/components/corner';
import { CapsuleResponse } from '@/src/features/capsule-reponse/types/capsule-response.types';
import React from 'react';
import { View } from 'react-native';

type ResponseMoonProps = {
    capsuleResponse: CapsuleResponse;
};
export const ResponseMoon = (props: ResponseMoonProps) => {
    const { capsuleResponse } = props;

    return (
        <View
            style={{
                position: 'relative',
                backgroundColor: Colors.linenCloud,
                borderRadius: 16,
                paddingHorizontal: 40,
                paddingVertical: 40,
            }}
        >
            <Corner style={{ top: 16, left: 16, transform: [{ rotate: '270deg' }] }} />
            <Corner style={{ top: 16, right: 16, transform: [{ rotate: '0deg' }] }} />
            <Corner style={{ bottom: 16, right: 16, transform: [{ rotate: '90deg' }] }} />
            <Corner style={{ bottom: 16, left: 16, transform: [{ rotate: '180deg' }] }} />
            <View style={{
                gap: 16,
            }}>

                <Text family="seasons" style={{ fontSize: 16, color: Colors.slateRoot, textAlign: 'center' }}>La réponse de la lune</Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: Colors.slateRoot,
                        textAlign: 'center',
                    }}
                >
                    &quot;{capsuleResponse?.aiResponse}&quot;
                </Text>
            </View>
        </View >
    );
};
