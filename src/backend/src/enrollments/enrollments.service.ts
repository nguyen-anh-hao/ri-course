import { Injectable } from "@nestjs/common";
import { CreateEnrollmentDto } from "./dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { EnrollmentEntity } from "./entities/enrollment.entity";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class EnrollmentsService {
    constructor(private prisma : PrismaService) {}

    async findAll() : Promise<EnrollmentEntity[]> {
        const enrollments = await this.prisma.enrollment.findMany();

        return enrollments.map(enrollment => new EnrollmentEntity(enrollment));
    }

    async createOne(createEnrollmentDto: CreateEnrollmentDto) : Promise<EnrollmentEntity> {
        const enrollment = await this.prisma.enrollment.create({
            data : createEnrollmentDto
        });

        return new EnrollmentEntity(enrollment);
    }

    async findByUserId(learnerId: number) : Promise<EnrollmentEntity[]> {
        const enrollments = await this.prisma.enrollment.findMany({
            where: {
                learnerId
            }
        });

        return enrollments.map(enrollment => new EnrollmentEntity(enrollment));
    } 
    
    async findByCourseId(courseId: number) : Promise<UserEntity[]> {
        const enrollments = await this.prisma.enrollment.findMany({
            select: {
                learner: true
            },
            where: {
                courseId
            }
        });
    
        return enrollments.map(enrollments => new UserEntity(enrollments.learner));
    }

    async kickLearnerFromCourse(learnerId: number, courseId: number) {
        return await this.prisma.enrollment.delete({
            where: {
                learnerId_courseId: {
                    learnerId,
                    courseId
                }
            }
        })
    }

    async enrolled(learnerId: number, courseId: number) {
        const enrollment =  await this.prisma.enrollment.findUnique({
            where: {
                learnerId_courseId: {
                    learnerId,
                    courseId
                }
            }
        });

        return !!enrollment;
    }

}
