import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

export const useBreakSound = () => {
    const soundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require("@/assets/sounds/breath-sound.wav")
            );

            await sound.setVolumeAsync(1);
            if (mounted) soundRef.current = sound;
        };

        loadSound();

        return () => {
            mounted = false;
            soundRef.current?.unloadAsync();
        };
    }, []);

    const play = async () => {
        try {
            await soundRef.current?.replayAsync();
        } catch (e) {
            console.log("Sound error", e);
        }
    };

    return { play };
};