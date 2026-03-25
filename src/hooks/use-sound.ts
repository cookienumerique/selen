import { Audio, AVPlaybackSource } from 'expo-av';
import { useEffect, useRef, useState } from 'react';

export const useSound = (requirePath: AVPlaybackSource) => {
    const soundRef = useRef<Audio.Sound | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadSound = async () => {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
                shouldDuckAndroid: true,
            });

            const { sound } = await Audio.Sound.createAsync(requirePath);

            await sound.setVolumeAsync(1);
            if (mounted) {
                soundRef.current = sound;
                setIsReady(true);
            }
        };

        loadSound();

        return () => {
            mounted = false;
            if (soundRef.current) {
                soundRef.current.stopAsync().catch(() => { });
                soundRef.current.unloadAsync().catch(() => { });
            }
        };
    }, [requirePath]);

    const play = async () => {
        if (!soundRef.current || !isReady) return;
        try {
            await soundRef.current?.replayAsync();
        } catch (e) {
            console.error('Sound error', e);
        }
    };
    const stop = async () => {
        if (!soundRef.current) return;
        try {
            await soundRef.current?.stopAsync();
        } catch (e) {
            console.error('Sound error', e);
        }
    };

    return { play, isReady, stop };
};
