import {
  CreateCapsuleResponsePayload,
  useCreateCapsuleResponse,
} from '@/src/features/capsule-reponse/hooks/use-create';
import { useFetchCapsulesResponse } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response';
import { useFetchCapsules } from '@/src/features/capsule/hooks/use-fetch-capsules';
import { Capsule } from '@/src/features/capsule/types/capsule.types';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext } from 'react';
import { Vibration } from 'react-native';

type CapsulesContextReturn = {
  capsuleOfTheDay: Capsule | undefined;
  isLoadingCapsuleOfTheDay: boolean;
  createCapsuleResponse: ({
    capsuleId,
    response,
  }: CreateCapsuleResponsePayload) => void;
  isLoadingCreateCapsuleResponseMutation: boolean;
  capsuleAlreadyRespondedToday: boolean;
};

type CapsulesProviderProps = {
  children: ReactNode;
  id: string;
};

const CapsulesContext = createContext<CapsulesContextReturn | undefined>(
  undefined,
);

export function CapsulesProvider({ children, id }: CapsulesProviderProps) {
  const { data: capsules = [], isLoading: isLoadingCapsules } =
    useFetchCapsules({ params: { subThemeCapsuleId: id } });
  const {
    data: capsulesResponses = [],
    isLoading: isLoadingCapsulesResponses,
    refetch: refetchCapsulesResponses,
  } = useFetchCapsulesResponse();
  const {
    mutateAsync: createCapsuleResponseMutation,
    isPending: isLoadingCreateCapsuleResponseMutation,
  } = useCreateCapsuleResponse({
    onSuccess: async (capsuleResponse) => {
      Vibration.vibrate(800);
      await refetchCapsulesResponses();
      router.push({
        pathname: '/capsule/capsule-answered',
        params: { capsule: JSON.stringify(capsuleResponse) },
      });
    }
  });

  const capsulesResponsesIds = capsulesResponses.map(
    (capsuleResponse) => capsuleResponse.capsule?.id,
  );
  const capsuleAlreadyRespondedToday: boolean = capsulesResponses.some(
    (capsule) => dayjs(capsule.createdAt).isSame(dayjs(), 'day'),
  );

  const capsuleOfTheDay = capsules?.find(
    (capsule) => !capsulesResponsesIds.includes(capsule.id),
  );

  const createCapsuleResponse = async (
    payload: CreateCapsuleResponsePayload,
  ) => await createCapsuleResponseMutation(payload);

  const isLoadingCapsuleOfTheDay =
    isLoadingCapsules || isLoadingCapsulesResponses;
  return (
    <CapsulesContext.Provider
      value={{
        capsuleOfTheDay,
        isLoadingCapsuleOfTheDay,
        createCapsuleResponse,
        isLoadingCreateCapsuleResponseMutation,
        capsuleAlreadyRespondedToday,
      }}
    >
      {children}
    </CapsulesContext.Provider>
  );
}

export function useCapsules() {
  const ctx = useContext(CapsulesContext);
  if (!ctx) {
    throw new Error('useCapsules must be used inside <CapsulesProvider>');
  }
  return ctx;
}
