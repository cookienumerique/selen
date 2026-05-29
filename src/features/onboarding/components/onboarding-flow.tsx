import { toastConfig } from '@/src/components/toast/selen-toast';
import { CareScreen } from '@/src/features/onboarding/components/care-screen';
import { ConsentRefusedScreen } from '@/src/features/onboarding/components/consent-refused-screen';
import { IntentScreen } from '@/src/features/onboarding/components/intent-screen';
import { RgpdScreen } from '@/src/features/onboarding/components/rgpd-screen';
import { WelcomeScreen } from '@/src/features/onboarding/components/welcome-screen';
import { useSaveOnboarding } from '@/src/features/onboarding/hooks/use-save-onboarding';
import { SignupIntent } from '@/src/features/onboarding/types/onboarding.types';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';

type Step = 'welcome' | 'consent' | 'consentRefused' | 'intent' | 'care';

// Orchestrateur de l'onboarding 1.26 : Bienvenue -> RGPD -> Intention -> (météo).
// Branches : refus du consentement (bloque, ne soumet pas) et écran de soin
// si l'intention déclarée est "moment difficile".
export const OnboardingFlow = () => {
  const [step, setStep] = useState<Step>('welcome');
  // Intention retenue le temps de passer par l'écran de soin avant de soumettre.
  const [pendingIntent, setPendingIntent] = useState<SignupIntent | null>(null);
  const [pendingIntentOther, setPendingIntentOther] = useState<string | null>(
    null,
  );
  const { mutate, isPending } = useSaveOnboarding({
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Connexion impossible',
        text2: 'Réessaie dans un instant.',
        position: 'bottom',
      });
    },
  });

  const completeOnboarding = (
    intent: SignupIntent | null,
    intentOther: string | null,
  ) => {
    if (isPending) return;
    mutate({
      consentAccepted: true,
      intent,
      intentOther: intent === 'other' ? intentOther : null,
    });
  };

  const handleIntentSubmit = (
    intent: SignupIntent | null,
    intentOther: string | null,
  ) => {
    if (intent === 'difficult_time') {
      setPendingIntent(intent);
      setPendingIntentOther(intentOther);
      setStep('care');
      return;
    }
    completeOnboarding(intent, intentOther);
  };

  let screen: React.ReactNode;
  if (step === 'welcome') {
    screen = <WelcomeScreen onContinue={() => setStep('consent')} />;
  } else if (step === 'consent') {
    screen = (
      <RgpdScreen
        onAccept={() => setStep('intent')}
        onRefuse={() => setStep('consentRefused')}
      />
    );
  } else if (step === 'consentRefused') {
    screen = <ConsentRefusedScreen onBack={() => setStep('consent')} />;
  } else if (step === 'care') {
    screen = (
      <CareScreen
        isSubmitting={isPending}
        onContinue={() => completeOnboarding(pendingIntent, pendingIntentOther)}
      />
    );
  } else {
    screen = (
      <IntentScreen onSubmit={handleIntentSubmit} isSubmitting={isPending} />
    );
  }

  return (
    <>
      {screen}
      {/* Hôte Toast interne : le flow est rendu dans un Modal RN, un Toast racine
          s'afficherait derrière. */}
      <Toast config={toastConfig} bottomOffset={40} />
    </>
  );
};
