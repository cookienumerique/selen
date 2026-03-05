import * as FileSystem from 'expo-file-system/legacy';
import { useRef } from 'react';
import { Platform } from 'react-native';
import Share, { Social } from 'react-native-share';
import ViewShot from 'react-native-view-shot';

export const useCapsuleShare = () => {
    const viewShotRef = useRef<ViewShot>(null);

    const generateImage = async () => {

        if (!viewShotRef.current) return;
        const uri = await viewShotRef.current.capture?.();
        return uri;
    };

    const shareImage = async (target: 'instagram' | 'facebook') => {

        const uri = await generateImage();
        if (!uri) return;
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        try {
            if (target === 'instagram') {
                await Share.shareSingle({
                    social: Social.InstagramStories,
                    backgroundImage: Platform.OS === 'ios' ? `data:image/png;base64,${base64}` : uri,
                    backgroundTopColor: '#2f3e46',
                    backgroundBottomColor: '#2f3e46',
                    appId: '1445836246903878',
                });
            } else if (target === 'facebook') {
                Share.shareSingle({
                    social: Social.FacebookStories,
                    backgroundImage: Platform.OS === 'ios' ? `data:image/png;base64,${base64}` : uri,
                    appId: '1445836246903878',
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    return {
        viewShotRef,
        shareImage,
    };
};