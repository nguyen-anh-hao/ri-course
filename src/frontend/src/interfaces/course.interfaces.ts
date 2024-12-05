import { User } from './user.interfaces';

export interface Course {
    id: number;
    title: string;
    mentor?: User[];
    description: string;
    createAt: string;
    updatedAt: string;
}