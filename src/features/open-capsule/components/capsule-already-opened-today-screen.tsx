import CapsuleAlreadyRespondedToday from '@/app/capsule/capsule-already-responded-today';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import React from 'react';
import {
    KeyboardAvoidingView,
    View
} from 'react-native';

export const CapsuleAlreadyOpenedTodayScreen = () => {
    return (
        <Container>
            <MoonBackground />
            <View style={{ gap: 16 }}>
                <Header />
            </View>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <CapsuleAlreadyRespondedToday />
            </KeyboardAvoidingView>
        </Container>
    )
}