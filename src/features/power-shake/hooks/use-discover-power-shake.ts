import { User } from "@/src/features/user/types/user.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const DISCOVER_KEY = "discover_power_shake";

export function useDiscoverPowerShake(user: User | null) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!user) return;

        const check = async () => {
            const alreadySeen = await AsyncStorage.getItem(DISCOVER_KEY);
            if (!alreadySeen) setVisible(true);
        };

        check();
    }, [user]);

    const close = async () => {
        await AsyncStorage.setItem(DISCOVER_KEY, "true");
        setVisible(false);
    };

    return { visible, close };
}