import {
  CreateCapsuleResponsePayload,
  useCreateCapsuleResponse,
} from '@/src/features/capsule-reponse/hooks/use-create';
import { useFetchCapsulesResponse } from '@/src/features/capsule-reponse/hooks/use-fetch-capsules-response';
import { useFetchCapsules } from '@/src/features/capsule/hooks/use-fetch-capsules';
import { Capsule } from '@/types/capsule';
import { CapsuleResponse } from '@/types/capsule-response';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext } from 'react';
type CapsulesContextReturn = {
  capsules: Capsule[];
  isLoadingCapsules: boolean;
  capsulesResponses: CapsuleResponse[];
  isLoadingCapsulesResponses: boolean;
  createCapsuleResponse: ({
    capsuleId,
    response,
  }: CreateCapsuleResponsePayload) => void;
  isLoadingCreateCapsuleResponseMutation: boolean;
  capsuleAlreadyRespondedToday: boolean;
};

const CapsulesContext = createContext<CapsulesContextReturn | undefined>(
  undefined,
);

export function CapsulesProvider({ children }: { children: ReactNode }) {
  const { data: capsules = [], isLoading: isLoadingCapsules } =
    useFetchCapsules();
  const {
    data: capsulesResponses = [],
    isLoading: isLoadingCapsulesResponses,
    refetch: refetchCapsulesResponses,
  } = useFetchCapsulesResponse();
  const {
    mutateAsync: createCapsuleResponseMutation,
    isPending: isLoadingCreateCapsuleResponseMutation,
  } = useCreateCapsuleResponse();
  const capsuleAlreadyRespondedToday: boolean = capsulesResponses.some(
    (capsule) => dayjs(capsule.createdAt).isSame(dayjs(), 'day'),
  );

  const createCapsuleResponse = async (
    payload: CreateCapsuleResponsePayload,
  ) => {
    await createCapsuleResponseMutation(payload);
    refetchCapsulesResponses();
    router.push('/capsule/capsule-completion');
  };

  return (
    <CapsulesContext.Provider
      value={{
        capsules,
        isLoadingCapsules,
        capsulesResponses,
        isLoadingCapsulesResponses,
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
