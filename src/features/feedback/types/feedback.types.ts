
export type Feedback = {
    id: number;
    rating: 'positive' | 'negative';
    comment?: string;
    context: 'capsule' | 'journal';
    contextId: number;
    createdAt: string;
};