import { SubThemeCapsule } from "@/src/features/sub-theme-capsule/types/sub-theme-capsule.types";

export type SubThemeCapsuleWithProgress = {
  subThemeCapsule: SubThemeCapsule;
  totalCapsules: number;
  answeredCapsules: number;
  isCompleted: boolean;
};