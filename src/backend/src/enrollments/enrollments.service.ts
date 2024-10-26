import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dtos';

export type Enrollment = {
    userId: number,
    courseId: number,
    level?: number,
}

@Injectable()
export class EnrollmentsService {
    constructor() {}

    enrollments : Enrollment[] = [
        {
            userId: 1,
            courseId: 1,
        },
        {
            userId: 1,
            courseId: 2,
        },
        {
            userId: 2,
            courseId: 2,
        },
        {
            userId: 2,
            courseId: 3,
        },
        {
            userId: 4,
            courseId: 3,
        },
        {
            userId: 5,
            courseId: 1,
        },
    ];

    async create(createEnrollmentDto : CreateEnrollmentDto) {
        return await this.enrollments.push(createEnrollmentDto);
    }

    async findByUserId(userId : number) {
        return await this.enrollments.filter(enrollment => enrollment.userId === userId);
    }

    async findByCourseId(courseId : number) {
        return await this.enrollments.filter(enrollment => enrollment.courseId === courseId);
    }
}
