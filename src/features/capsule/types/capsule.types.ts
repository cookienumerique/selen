import { SubThemeCapsule } from '@/src/features/sub-theme-capsule/types/sub-theme-capsule.types';

export type Capsule = {
  id: number;
  title: string | null;
  content: string;
  createdAt: string;
  subThemeCapsule: SubThemeCapsule;
};
