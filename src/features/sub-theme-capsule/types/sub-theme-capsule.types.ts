import { ThemeCapsule } from "@/src/features/sub-theme-capsule/types/theme-capsule.types";

export type SubThemeCapsule = {
  id: number;
  code: string;
  name: string;
  image: string | null;
  themeCapsule: ThemeCapsule;
};
