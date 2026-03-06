import { Button } from '@/src/components/button';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { BreathingView } from '@/src/features/power-shake/components/breathing-view';
import { QuoteView } from '@/src/features/power-shake/components/quote-view';
import { useBreathingAnimation } from '@/src/features/power-shake/hooks/use-breathing-animation';
import { useBreathingCycles } from '@/src/features/power-shake/hooks/use-breathing-cycles';
import { useQuoteFlow } from '@/src/features/power-shake/hooks/use-quote-flow';
import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import quotes from './quotes.json';

type PowerShakeModalProps = {
  visible: boolean;
  onClose: () => void;
  stopBreathSound: () => void;
};

export default function PowerShakeModal({
  visible,
  onClose,
  stopBreathSound,
}: PowerShakeModalProps) {
  const [quote, setQuote] = useState<string>();
  const cycle = useBreathingCycles(visible);
  const breathOpacity = useSharedValue(1);
  const quoteOpacity = useSharedValue(0);

  const { size, start, reset } = useBreathingAnimation();

  useQuoteFlow({
    visible,
    breathOpacity,
    quoteOpacity,
    onClose,
  });

  useEffect(() => {
    if (!visible) {
      reset();
      breathOpacity.value = 1;
      quoteOpacity.value = 0;
      stopBreathSound();
      return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.quotes.length);
    setQuote(quotes.quotes[randomIndex].quote);

    start();
  }, [breathOpacity, quoteOpacity, reset, start, stopBreathSound, visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.slateRoot,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 32,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <BreathingView size={size} opacity={breathOpacity} cycle={cycle} />
          <QuoteView quote={quote} opacity={quoteOpacity} />
        </View>

        <Button onPress={onClose} style={{ marginTop: 'auto' }}>
          <Text style={{ color: Colors.linenCloud }}>Passer</Text>
        </Button>
      </View>
    </Modal>
  );
}
