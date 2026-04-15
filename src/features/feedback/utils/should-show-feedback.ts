import AsyncStorage from '@react-native-async-storage/async-storage';

const FEEDBACK_LAST_SHOWN_KEY = 'feedback:last_shown';

export const shouldShowFeedback = async (): Promise<boolean> => {
    const lastShown = await AsyncStorage.getItem(FEEDBACK_LAST_SHOWN_KEY);

    if (!lastShown) return true;

    const daysSinceLastShown = (Date.now() - Number(lastShown)) / (1000 * 60 * 60 * 24);
    const randomDelay = Math.floor(Math.random() * 5) + 13;
    return daysSinceLastShown >= randomDelay;
};

export const markFeedbackShown = async (): Promise<void> => {
    await AsyncStorage.setItem(FEEDBACK_LAST_SHOWN_KEY, String(Date.now()));
};