import { Capsule } from "@/types/capsule";

export type CapsuleAnswer = Capsule & {
  answer: string;
  date: Date;
};
