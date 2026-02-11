import CapsuleAlreadyRespondedToday from '@/app/capsule/capsule-already-responded-today';
import NoCapsuleAvailable from '@/app/capsule/no-capsule-available';
import { Button } from '@/src/components/button';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { Colors } from '@/src/constants/theme';
import { useCapsules } from '@/src/contexts/use-capsules';
import { useUser } from '@/src/contexts/use-user';
import { FontAwesome6 } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
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

  return (
    <Container>
      <MoonBackground />
      <View style={{ gap: 16 }}>
        <Header />
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        {capsuleAlreadyRespondedToday && !isLoadingCapsuleOfTheDay && (
          <CapsuleAlreadyRespondedToday />
        )}
        {!capsuleOfTheDay &&
          !capsuleAlreadyRespondedToday &&
          !isLoadingCapsuleOfTheDay && <NoCapsuleAvailable />}
        {userConnected && !capsuleAlreadyRespondedToday && capsuleOfTheDay && (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              gap: 32,
              paddingBottom: 16,
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
                <View
                  style={{
                    alignItems: 'center',
                    marginVertical: 32,
                  }}
                >
                  <Image
                    source={require('@/assets/images/capsule.png')}
                    style={{
                      width: 200,
                      height: 120,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    color: Colors.slateRoot,
                  }}
                >
                  {capsuleOfTheDay?.content}
                </Text>
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
        )}
      </KeyboardAvoidingView>
    </Container>
  );
}
