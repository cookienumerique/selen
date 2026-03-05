import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { Capsule } from '@/src/features/capsule/types/capsule.types';
import React from 'react';
import { View } from 'react-native';

type CapsulePreviewProps = {
    capsule: Capsule;
};
export const CapsulePreview = (props: CapsulePreviewProps) => {
    const { capsule } = props;
    return (
        <View style={{ alignItems: 'center', position: 'relative' }}>
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    opacity: 0.5,
                    width: '100%',
                    height: '100%',
                    borderRadius: 16,
                    paddingVertical: 32,
                    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 6,
                }}
            />
            <View style={{ paddingHorizontal: 16, paddingVertical: 64, gap: 16 }}>
                <Text
                    family="seasons"
                    variant="bold"
                    style={{
                        fontSize: 24,
                        textAlign: 'center',
                        color: Colors.slateRoot,
                    }}
                >
                    {capsule.title}
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: Colors.oakHoneyDark,
                        textAlign: 'center',
                    }}
                >
                    {capsule.content}
                </Text>
            </View>
        </View>
    );
};
