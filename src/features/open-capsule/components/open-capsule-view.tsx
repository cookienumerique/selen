import LoginScreen from '@/app/login-screen';
import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { Colors } from '@/src/constants/theme';
import { useCapsules } from '@/src/contexts/use-capsules';
import { useUser } from '@/src/contexts/use-user';
import { CapsuleAlreadyOpenedTodayScreen } from '@/src/features/open-capsule/components/capsule-already-opened-today-screen';
import { NoCapsuleAvailableScreen } from '@/src/features/open-capsule/components/no-capsule-available-screen';
import { FontAwesome6 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

export default function OpenCapsuleView() {
  const {
    capsuleOfTheDay,
    isLoadingCapsuleOfTheDay,
    capsuleAlreadyRespondedToday,
    createCapsuleResponse,
    isLoadingCreateCapsuleResponseMutation,
  } = useCapsules();

  const { user, isLoadingUser } = useUser();
  const userConnected = user && !isLoadingUser;

  const form = useForm<{
    response: string;
  }>({
    defaultValues: {
      response: '',
    },
  });

  const handleCreateCapsuleResponse = ({ response }: { response: string }) => {
    if (!capsuleOfTheDay?.id) return;
    createCapsuleResponse({
      capsuleId: capsuleOfTheDay?.id,
      response,
    });
  };

  const handleSkipCapsule = () => {
    if (!capsuleOfTheDay?.id) return;
    createCapsuleResponse({
      capsuleId: capsuleOfTheDay?.id,
      response: '',
    });
  };

  useEffect(() => {
    if (capsuleOfTheDay?.id) {
      const playHaptics = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }, 80);
      };
      playHaptics();
    }
  }, [capsuleOfTheDay]);

  if (isLoadingCapsuleOfTheDay) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.warmSand,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (capsuleAlreadyRespondedToday) {
    return <CapsuleAlreadyOpenedTodayScreen />;
  }

  if (!capsuleOfTheDay) {
    return <NoCapsuleAvailableScreen />;
  }

  if (!userConnected) {
    return <LoginScreen />;
  }

  return (
    <Container>
      <MoonBackground />
      <View style={{ gap: 16 }}>
        <Header title="Capsule du jour" />
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 16 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 32,
            marginTop: 32,
          }}
        >
          {isLoadingCapsuleOfTheDay && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <ActivityIndicator />
              <Text
                style={{
                  textAlign: 'center',
                }}
              >
                Chargement des données...
              </Text>
            </View>
          )}
          {!isLoadingCapsuleOfTheDay && (
            <>
              <View style={{ gap: 32 }}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('@/assets/images/capsule.png')}
                    style={{
                      height: 80,
                      resizeMode: 'contain',
                    }}
                  />
                </View>

                {capsuleOfTheDay.title && (
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: Colors.slateRoot,
                    }}
                  >
                    {capsuleOfTheDay.title}
                  </Text>
                )}

                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: Colors.oakHoneyDark,
                  }}
                >
                  {capsuleOfTheDay?.content}
                </Text>
                <View style={{ marginTop: 32 }}>
                  <Controller
                    control={form.control}
                    name="response"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <View
                        style={{
                          position: 'relative',
                        }}
                      >
                        <Image
                          source={require('@/assets/images/scotch.png')}
                          style={{
                            position: 'absolute',
                            top: -20,
                            left: '50%',
                            transform: [
                              {
                                translateX: -90,
                              },
                            ],
                            height: 40,
                            width: 180,
                            resizeMode: 'contain',
                            zIndex: 1,
                          }}
                        />
                        <TextInput
                          multiline
                          placeholder="Ne réfléchis pas trop. Écris ce qui vient, même si ce n'est pas clair."
                          value={value}
                          onChangeText={onChange}
                          numberOfLines={10}
                          style={{
                            borderRadius: 16,
                            borderColor: Colors.oakHoneyDark,
                            backgroundColor: 'white',
                            paddingVertical: 32,
                            padding: 16,
                            textAlignVertical: 'top',
                            height: 150,
                          }}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>

              <View
                style={{
                  position: 'relative',
                  marginTop: 'auto',
                  gap: 16,
                }}
              >
                <Button
                  style={{
                    marginTop: 'auto',
                  }}
                  onPress={form.handleSubmit(handleCreateCapsuleResponse)}
                  disabled={
                    !form.formState.isValid ||
                    isLoadingCreateCapsuleResponseMutation
                  }
                >
                  {isLoadingCreateCapsuleResponseMutation ? (
                    <ActivityIndicator />
                  ) : (
                    <Entypo name="pencil" size={14} color="white" />
                  )}

                  <Text
                    style={{
                      fontSize: 14,
                      color: 'white',
                    }}
                  >
                    Je pose mes mots
                  </Text>
                </Button>
                <Button
                  onPress={handleSkipCapsule}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <FontAwesome6
                    name="arrow-rotate-right"
                    size={14}
                    color="gray"
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                    }}
                  >
                    Passer cette capsule
                  </Text>
                </Button>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
