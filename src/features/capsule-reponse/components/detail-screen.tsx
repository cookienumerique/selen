import { Container } from '@/src/components/layout/container';
import { Header } from '@/src/components/layout/header';
import { Text } from '@/src/components/texts';
import { Colors } from '@/src/constants/theme';
import { ResponseMoon } from '@/src/features/capsule-answered/components/response-moon';
import { CancelButton } from '@/src/features/capsule-reponse/components/cancel-button';
import { CapsuleResponseInput } from '@/src/features/capsule-reponse/components/capsule-response';
import { CapsuleTitle } from '@/src/features/capsule-reponse/components/capsule-title';
import { MoreMenu } from '@/src/features/capsule-reponse/components/more-menu';
import { ResponseUserCard } from '@/src/features/capsule-reponse/components/response-user-card';
import { SaveButton } from '@/src/features/capsule-reponse/components/save-button';
import { ThemeSubThemeBadge } from '@/src/features/capsule-reponse/components/theme-sub-theme-badge';
import { useFetchCapsulesResponseById } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response-by-id';
import { useUpdateCapsuleResponse } from '@/src/features/capsule-reponse/hooks/use-update-capsule-response';
import { PremiumModal } from '@/src/features/premium/premium-modal';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View
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
  const capsuleAnswered = capsuleResponse?.response !== ''
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
      <Header onPress={() => router.push('/(tabs)/calendar')} title="Détail de la capsule" />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              flex: 1,
              fontSize: 12,
              fontWeight: 'bold',
              color: Colors.oakHoneyDark,
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
          >
            {dayjs(capsuleResponse?.createdAt).format(
              'dddd D MMMM YYYY',
            )}
          </Text>
          <MoreMenu
            setDisplayPremiumModal={setDisplayPremiumModal}
            onEdit={handleEditCapsuleResponse}
            onDelete={handleSkipCapsuleResponse}
          />
        </View>

        <View style={{ padding: 16, flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, gap: 16 }}>
              {isLoading && <ActivityIndicator />}
              {capsuleResponse && (
                <View
                  style={{
                    flex: 1,
                    gap: 32,
                  }}
                >

                  <View style={{ gap: 16 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', }}>
                      <ThemeSubThemeBadge subThemeCapsule={capsuleResponse.capsule?.subThemeCapsule} />
                    </View>
                    <CapsuleTitle title={capsuleResponse.capsule?.title} />
                    <Text variant="italic" style={{ fontSize: 12, color: Colors.slateRoot }}>{capsuleResponse.capsule?.content}</Text>
                  </View>

                  {!isEditing && (
                    <>
                      {capsuleAnswered ? <ResponseUserCard capsuleResponse={capsuleResponse} variant="light" /> : <Text style={{ fontSize: 14, fontStyle: 'italic', textAlign: 'center' }}>Cette capsule a été passée.</Text>}
                    </>
                  )}

                  {isEditing && (
                    <CapsuleResponseInput control={form.control} />
                  )}
                  {capsuleResponse?.aiResponse !== '' && (
                    <ResponseMoon capsuleResponse={capsuleResponse} variant="dark" />
                  )}
                </View>
              )}
              {isEditing && (
                <View style={{ flexDirection: 'row', gap: 16, marginTop: 'auto' }}>
                  <CancelButton onPress={() => setIsEditing(false)} />
                  <SaveButton
                    onPress={form.handleSubmit(handleUpdateCapsuleResponse)}
                    isLoading={isLoadingUpdateCapsuleResponseMutation}
                  />
                </View>
              )}
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <PremiumModal
        onClose={() => setDisplayPremiumModal(false)}
        isOpen={displayPremiumModal}
        title="Ta vérité actuelle"
        description={`Tes pensées d'hier ne sont plus forcément celles d'aujourd'hui.\n\nAvec Selen infini, garde le contrôle sur ton journal en modifiant ou supprimant tes capsules pour qu'elles reflètent toujours ta vérité actuelle.`}
      />
    </Container>
  );
};
