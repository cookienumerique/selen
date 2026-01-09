import { useFetchCapsules } from "@/src/features/capsule/hooks/use-fetch-capsules";
import { Capsule } from "@/types/capsule";
import { CapsuleAnswer } from "@/types/capsule-answer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
type CapsulesContextReturn = {
  capsules: Capsule[];
  saveCapsule: (capsule: CapsuleAnswer) => Promise<void>;
  capsulesAnswered: CapsuleAnswer[];
  clearCapsulesAnswered: () => Promise<void>;
  hasUnlockedCapsuleToday: boolean;
};

const CapsulesContext = createContext<CapsulesContextReturn | undefined>(
  undefined
);

export function CapsulesProvider({ children }: { children: ReactNode }) {
  const { data } = useFetchCapsules();
  const capsules = data?.capsules || [];
  const [capsulesAnswered, setCapsulesAnswered] = useState<CapsuleAnswer[]>([]);
  const CAPSULES_STORAGE_KEY = "selen_capsules";

  const getCapsulesAnswered = async (): Promise<CapsuleAnswer[]> => {
    const capsules = await AsyncStorage.getItem(CAPSULES_STORAGE_KEY);
    return capsules ? JSON.parse(capsules) : [];
  };

  const saveCapsule = async (capsule: CapsuleAnswer) => {
    const previousCapsules = await getCapsulesAnswered();
    const newCapsules = [...previousCapsules, capsule];
    await AsyncStorage.setItem(
      CAPSULES_STORAGE_KEY,
      JSON.stringify(newCapsules)
    );
    setCapsulesAnswered(newCapsules);
  };

  const clearCapsulesAnswered = async () => {
    await AsyncStorage.removeItem(CAPSULES_STORAGE_KEY);
    setCapsulesAnswered([]);
    console.log("capsulesAnswered cleared");
  };

  useEffect(() => {
    getCapsulesAnswered().then((capsulesAnswered) => {
      setCapsulesAnswered(capsulesAnswered);
    });
  }, []);

  const hasUnlockedCapsuleToday: boolean = capsulesAnswered.some((capsule) =>
    dayjs(capsule.date).isSame(dayjs(), "day")
  );

  return (
    <CapsulesContext.Provider
      value={{
        capsules,
        saveCapsule,
        capsulesAnswered,
        clearCapsulesAnswered,
        hasUnlockedCapsuleToday,
      }}
    >
      {children}
    </CapsulesContext.Provider>
  );
}

export function useCapsules() {
  const ctx = useContext(CapsulesContext);
  if (!ctx) {
    throw new Error("useCapsules must be used inside <CapsulesProvider>");
  }
  return ctx;
}
