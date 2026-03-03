import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import React from "react";
import { Image, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export function BreathingView({ size, opacity, cycle }: any) {

    const circleStyle = useAnimatedStyle(() => ({
        width: size.value,
        height: size.value,
        borderRadius: size.value / 2,
    }));

    const containerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={containerStyle}>
            <View style={{ gap: 128 }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Animated.View
                        style={[
                            {
                                position: "absolute",
                                backgroundColor: Colors.linenCloud,
                                opacity: 0.25,
                            },
                            circleStyle,
                        ]}
                    />

                    <Image
                        source={require('@/assets/images/breath-moon.png')}
                        style={{ width: 100, height: 100 }}
                    />
                </View>

                <View style={{ alignItems: "center", gap: 16 }}>
                    <Text style={{ color: Colors.linenCloud, fontSize: 24 }}>
                        Respire avec moi
                    </Text>
                    <Text style={{ color: Colors.linenCloud, fontSize: 12 }}>
                        Encore {cycle} {cycle === 1 ? 'respiration' : 'respirations'}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
}