import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { SubscriptionOffers, useSubscription } from '@/src/features/subscription/hooks/use-subscription';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Subscription() {
    const { buy, isLoading } = useSubscription();

    const handleSubscribe = async (subscriptionId: SubscriptionOffers) => {
        console.log('subscribe', subscriptionId);
        await buy(subscriptionId);
    };
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
        <Button onPress={() => handleSubscribe('selen-premium-monthly')} disabled={isLoading}>
            {isLoading ? <ActivityIndicator size="small" color="white" /> : null}
            <Text style={{ color: "white" }}>Abonnement mensuel</Text>
        </Button>
        <Button onPress={() => handleSubscribe('selen-premium-yearly')} disabled={isLoading}>
            {isLoading ? <ActivityIndicator size="small" color="white" /> : null}

            <Text style={{ color: "white" }}>Abonnement annuel</Text>
        </Button>
    </View>;
}
