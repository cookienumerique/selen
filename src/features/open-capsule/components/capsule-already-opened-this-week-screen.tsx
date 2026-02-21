import CapsuleAlreadyRespondedThisWeek from '@/app/capsule/capsule-already-responded-this-week';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import React from 'react';
import {
    KeyboardAvoidingView,
    View
} from 'react-native';

export const CapsuleAlreadyOpenedThisWeekScreen = () => {
    return (
        <Container>
            <MoonBackground />
            <View style={{ gap: 16 }}>
                <Header />
            </View>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <CapsuleAlreadyRespondedThisWeek />
            </KeyboardAvoidingView>
        </Container>
    )
}