import { useNotificationPermission } from '@/src/features/notification/hooks/use-notification-permission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications/src/Notifications.types';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { messages } from './notification-message.json';

const CAPSULE_NOTIFICATION_SUBSCRIBED = 'capsule_notification:subscribed';
const CAPSULE_NOTIFICATION_TIME = 'capsule_notification:time';
const CAPSULE_NOTIFICATION_FIRST_INIT_DONE = 'capsule_notification:first_init_done';

const DEFAULT_CAPSULE_NOTIFICATION_TIME: CapsuleNotificationTime = { hours: 7, minutes: 45 };

export type CapsuleNotificationTime = {
    hours: number;
    minutes: number;
}

type SubscribeParams = {
    title: string;
    body: string;
} & CapsuleNotificationTime;

type NotificationCapsuleReturn = {
    subscribe: (params?: SubscribeParams) => Promise<void>;
    unsubscribe: () => Promise<void>;
    initSubscription: () => Promise<void>;
    time: CapsuleNotificationTime;
    isSubscribed: boolean;
    isLoaded: boolean;
}

const NotificationCapsule = createContext<NotificationCapsuleReturn | undefined>(undefined);

const randomMessage = () => messages[Math.floor(Math.random() * messages.length)];

export const NotificationCapsuleProvider = ({ children }: { children: ReactNode }) => {
    const [firstInitDone, setFirstInitDone] = useState(false);
    const [time, setTime] = useState<CapsuleNotificationTime>(DEFAULT_CAPSULE_NOTIFICATION_TIME);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const { requestPermission, isGranted } = useNotificationPermission();

    useEffect(() => {
        const init = async () => {
            const [storedSubscription, storedTime, storedFirstInit] = await Promise.all([
                AsyncStorage.getItem(CAPSULE_NOTIFICATION_SUBSCRIBED),
                AsyncStorage.getItem(CAPSULE_NOTIFICATION_TIME),
                AsyncStorage.getItem(CAPSULE_NOTIFICATION_FIRST_INIT_DONE),
            ]);

            if (storedSubscription === 'true') setIsSubscribed(true);
            if (storedTime) setTime(JSON.parse(storedTime));
            if (storedFirstInit === 'true') setFirstInitDone(true);
            setIsLoaded(true);
        };

        init();
    }, []);

    const subscribe = async ({
        title,
        body,
        hours,
        minutes,
    }: SubscribeParams = {
            ...randomMessage(),
            ...DEFAULT_CAPSULE_NOTIFICATION_TIME,
        }) => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await Promise.all([
            AsyncStorage.setItem(CAPSULE_NOTIFICATION_SUBSCRIBED, 'true'),
            AsyncStorage.setItem(CAPSULE_NOTIFICATION_TIME, JSON.stringify({ hours, minutes })),
        ]);
        await Notifications.scheduleNotificationAsync({
            content: { title, body },
            trigger: {
                type: SchedulableTriggerInputTypes.DAILY,
                hour: hours,
                minute: minutes,
            },
        });
        setIsSubscribed(true);
        setTime({ hours, minutes });
        console.info('Subscribed to notification capsule at', { hours, minutes });
    };

    const unsubscribe = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await AsyncStorage.removeItem(CAPSULE_NOTIFICATION_SUBSCRIBED);
        setIsSubscribed(false);
        setTime(DEFAULT_CAPSULE_NOTIFICATION_TIME);
        console.info('Unsubscribed from notification capsule');
    };

    const initSubscription = useCallback(async () => {
        if (!isLoaded || isSubscribed || firstInitDone) return;

        if (!isGranted) {
            const status = await requestPermission();
            if (status !== 'granted') return;
        }
        console.info('Initializing notification capsule subscription');
        await subscribe();
        await AsyncStorage.setItem(CAPSULE_NOTIFICATION_FIRST_INIT_DONE, 'true');
        setFirstInitDone(true);
    }, [isLoaded, isSubscribed, isGranted, firstInitDone]);

    return (
        <NotificationCapsule.Provider value={{ subscribe, unsubscribe, initSubscription, time, isSubscribed, isLoaded }}>
            {children}
        </NotificationCapsule.Provider>
    );
};

export const useNotificationCapsule = () => {
    const ctx = useContext(NotificationCapsule);
    if (!ctx) throw new Error('useNotificationCapsule must be used inside <NotificationCapsuleProvider>');
    return ctx;
};