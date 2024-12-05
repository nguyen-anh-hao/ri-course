export interface User {
    id: number;
    username: string;
    fullname: string;
    email: string | null;
    roles: string[];
    dob: string;
    createAt: string;
    updatedAt?: string;
    lastSignIn?: string;
}