export type User = {
    id: number;
    fullName: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
};
