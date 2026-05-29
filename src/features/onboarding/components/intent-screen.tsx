import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Text } from '@/src/components/texts';
import { Colors, Fonts } from '@/src/constants/theme';
import {
  INTENT_OPTIONS,
  SignupIntent,
} from '@/src/features/onboarding/types/onboarding.types';
import React, { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

type IntentScreenProps = {
  onSubmit: (intent: SignupIntent | null, intentOther: string | null) => void;
  isSubmitting: boolean;
};

export const IntentScreen = ({ onSubmit, isSubmitting }: IntentScreenProps) => {
  const [selected, setSelected] = useState<SignupIntent | null>(null);
  const [otherText, setOtherText] = useState<string>('');

  const canContinue =
    selected !== null &&
    (selected !== 'other' || otherText.trim().length > 0) &&
    !isSubmitting;

  const handleContinue = () => {
    if (!canContinue || selected === null) return;
    onSubmit(selected, selected === 'other' ? otherText.trim() : null);
  };

  return (
    <Container style={{ backgroundColor: Colors.warmSand }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={{ fontSize: 38, textAlign: 'center', marginTop: 8 }}>
            🌙
          </Text>

          <Text
            family="seasons"
            style={{
              color: Colors.slateRoot,
              fontSize: 25,
              textAlign: 'center',
              marginTop: 16,
            }}
          >
            {'Qu\'est-ce qui t\'amène ici ?'}
          </Text>

          <Text
            style={{
              color: Colors.sateRootLight,
              fontSize: 12,
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: 8,
              marginBottom: 20,
              lineHeight: 18,
            }}
          >
            {'Aucune mauvaise réponse, c\'est juste pour mieux t\'accueillir.'}
          </Text>

          {INTENT_OPTIONS.map((option) => {
            const isActive = selected === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setSelected(option.value)}
                disabled={isSubmitting}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: 14,
                  backgroundColor: isActive
                    ? 'rgba(184,198,169,0.3)'
                    : 'rgba(255,255,255,0.5)',
                  borderWidth: 1.5,
                  borderColor: isActive
                    ? Colors.sageMistDark
                    : 'rgba(47,62,70,0.1)',
                  borderRadius: 14,
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 19,
                    height: 19,
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor: Colors.slateRoot,
                    marginTop: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isActive && (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: Colors.slateRoot,
                      }}
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 20,
                      color: Colors.slateRoot,
                    }}
                  >
                    {option.label}
                  </Text>
                  {option.value === 'other' && isActive && (
                    <TextInput
                      value={otherText}
                      onChangeText={setOtherText}
                      maxLength={200}
                      placeholder="En quelques mots, si tu veux"
                      placeholderTextColor={Colors.gray}
                      style={{
                        marginTop: 8,
                        paddingVertical: 8,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: 'rgba(47,62,70,0.2)',
                        borderRadius: 8,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        color: Colors.slateRoot,
                        fontFamily: Fonts.openSans.regular,
                        fontSize: 13,
                      }}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ marginTop: 12 }}>
          <Button
            onPress={handleContinue}
            disabled={!canContinue}
            style={{
              backgroundColor: Colors.slateRoot,
              width: '100%',
              opacity: canContinue ? 1 : 0.4,
            }}
          >
            <Text variant="bold" style={{ color: Colors.linenCloud }}>
              {'Continuer'}
            </Text>
          </Button>

          <Text
            onPress={() => {
              if (isSubmitting) return;
              onSubmit('skipped', null);
            }}
            variant="bold"
            style={{
              color: Colors.slateRoot,
              fontSize: 14,
              textAlign: 'center',
              textDecorationLine: 'underline',
              paddingVertical: 14,
              marginTop: 4,
            }}
          >
            {'Je préfère ne pas répondre'}
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};
