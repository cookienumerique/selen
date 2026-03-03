import { Text } from "@/src/components/texts";
import { Colors } from "@/src/constants/theme";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export function QuoteView({ quote, opacity }: any) {

    const style = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                {
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 40,
                },
                style,
            ]}
        >
            <Text
                style={{
                    color: Colors.linenCloud,
                    fontSize: 22,
                    textAlign: "center",
                }}
            >
                {quote}
            </Text>
        </Animated.View>
    );
}