import { useEffect, useRef } from 'react';
import { endConnection, initConnection } from 'react-native-iap';

export const useIapInit = () => {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;

        const init = async () => {
            try {
                await initConnection();
                initialized.current = true;
                console.log('IAP connection initialized');
            } catch (error) {
                console.warn('IAP init error:', error);
            }
        };

        init();

        return () => {
            if (initialized.current) {
                endConnection();
                initialized.current = false;
                console.log('IAP connection closed');
            }
        };
    }, []);
};