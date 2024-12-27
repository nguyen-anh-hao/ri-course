export interface Exam {
    id: number;
    name: string;
    description: string;
    date: string;
    duration: number; // in minutes
    totalMarks: number;
    passingMarks: number;
    status: 'active' | 'finished';
    createdAt: string;
    updatedAt?: string;
}