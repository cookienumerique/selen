import { Card } from '@/src/components/card';
import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { MoonBackground } from '@/src/components/layout/moon-background';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { CancelButton } from '@/src/features/capsule-reponse/components/cancel-button';
import { CapsuleContent } from '@/src/features/capsule-reponse/components/capsule-content';
import { CapsuleImage } from '@/src/features/capsule-reponse/components/capsule-image';
import { CapsuleTitle } from '@/src/features/capsule-reponse/components/capsule-title';
import { MoreMenu } from '@/src/features/capsule-reponse/components/more-menu';
import { SaveButton } from '@/src/features/capsule-reponse/components/save-button';
import { useFetchCapsulesResponseById } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response-by-id';
import { useUpdateCapsuleResponse } from '@/src/features/capsule-reponse/hooks/use-update-capsule-response';
import { PremiumModal } from '@/src/features/premium/premium-modal';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

export const CapsuleResponseDetailScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayPremiumModal, setDisplayPremiumModal] = useState(false);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const {
    data: capsuleResponse,
    isLoading,
    invalidate: invalidateCapsuleResponse,
  } = useFetchCapsulesResponseById(Number(id));

  const {
    mutateAsync: updateCapsuleResponse,
    isPending: isLoadingUpdateCapsuleResponseMutation,
  } = useUpdateCapsuleResponse({
    onSuccess: () => {
      setIsEditing(false);
      invalidateCapsuleResponse();
    },
    onError: (error) => {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Erreur lors de la mise à jour de la capsule',
        position: 'bottom',
        autoHide: false,
      });
      setIsEditing(false);
    },
  });

  const { response: responseDefault } = capsuleResponse ?? {};

  const form = useForm<{
    response: string;
  }>({
    defaultValues: {
      response: '',
    },
  });
  const { reset } = form;

  useEffect(() => {
    if (responseDefault) {
      reset({
        response: responseDefault,
      });
    }
  }, [responseDefault, reset]);

  const response =
    capsuleResponse?.response === '' || capsuleResponse?.response === null
      ? "Vous n'avez pas répondu à la capsule"
      : `${capsuleResponse?.response}`;

  const handleEditCapsuleResponse = () => {
    setIsEditing(true);
  };

  const handleSkipCapsuleResponse = async () => {
    await updateCapsuleResponse({ id: Number(id), response: '' });
  };

  const handleUpdateCapsuleResponse = async ({
    response,
  }: {
    response: string;
  }) => {
    await updateCapsuleResponse({ id: Number(id), response });
  };

  return (
    <Container>
      <MoonBackground />
      <Header onGoBack={() => router.push('/(tabs)/calendar')} />
      <PremiumModal
        onClose={() => setDisplayPremiumModal(false)}
        isOpen={displayPremiumModal}
        title="Ta vérité actuelle"
        description={`Tes pensées d'hier ne sont plus forcément celles d'aujourd'hui.\n\nAvec Selen infini, garde le contrôle sur ton journal en modifiant ou supprimant tes capsules pour qu'elles reflètent toujours ta vérité actuelle.`}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            paddingVertical: 32,
          }}
        >
          {isLoading && <ActivityIndicator />}
          {capsuleResponse && (
            <View
              style={{
                flex: 1,
                gap: 32,
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CapsuleImage />
              </View>

              <View style={{ gap: 8 }}>
                <CapsuleTitle title={capsuleResponse.capsule?.title} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: Colors.oakHoneyDark,
                    textAlign: 'center',
                  }}
                >
                  Capsule du{' '}
                  {dayjs(capsuleResponse.createdAt).format(
                    'dddd D MMMM YYYY, à HH:mm',
                  )}
                </Text>
              </View>

              <CapsuleContent content={capsuleResponse.capsule?.content} />

              <Card
                style={{
                  gap: 36,
                  paddingHorizontal: 24,
                  position: 'relative',
                  minHeight: 150,
                }}
              >
                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                  <MoreMenu
                    setDisplayPremiumModal={setDisplayPremiumModal}
                    onEdit={handleEditCapsuleResponse}
                    onDelete={handleSkipCapsuleResponse}
                  />
                </View>
                {!isEditing && (
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.oakHoneyDark,
                      fontStyle: 'italic',
                    }}
                  >
                    {response}
                  </Text>
                )}
                {isEditing && (
                  <Controller
                    control={form.control}
                    name="response"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={{ marginRight: 24 }}
                        multiline
                        placeholder="Ne réfléchis pas trop. Écris ce qui vient, même si ce n'est pas clair."
                        value={value}
                        onChangeText={onChange}
                        numberOfLines={10}
                      />
                    )}
                  />
                )}
              </Card>
              {isEditing && (
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <CancelButton onPress={() => setIsEditing(false)} />
                  <SaveButton
                    onPress={form.handleSubmit(handleUpdateCapsuleResponse)}
                    isLoading={isLoadingUpdateCapsuleResponseMutation}
                  />
                </View>
              )}
            </View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};
