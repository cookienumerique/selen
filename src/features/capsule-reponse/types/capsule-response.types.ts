import { Capsule } from '@/src/features/capsule/types/capsule.types';
import { User } from '@/src/features/user/types/user.types';

export type CapsuleResponse = {
  id: number;
  response: string;
  aiResponse: string | null;
  createdAt: string;
  author: User;
  capsule: Capsule;
};
