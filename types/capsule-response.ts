import { Capsule } from "@/types/capsule";
import { User } from "@/types/user";

export type CapsuleResponse = {
  id: number;
  response: string;
  createdAt: string;
  author: User;
  capsule: Capsule;
};
