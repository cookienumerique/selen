import { User } from "@/src/features/user/types/user.types";

export type JournalEntry = {
    id: number;
    content: string;
    aiResponse: string;
    author: User;
    createdAt: string;
};