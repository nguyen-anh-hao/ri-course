import { Injectable } from "@nestjs/common";
import { CreateEnrollmentDto } from "./dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { EnrollmentEntity } from "./entities/enrollment.entity";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class EnrollmentsService {
    constructor(private prisma : PrismaService, ) {}

    async findAll() : Promise<EnrollmentEntity[]> {
        const enrollments = await this.prisma.enrollment.findMany();

        return enrollments.map(enrollment => new EnrollmentEntity(enrollment));
    }

    async create(createEnrollmentDto: CreateEnrollmentDto) : Promise<EnrollmentEntity> {
        const enrollment = await this.prisma.enrollment.create({
            data : createEnrollmentDto
        });

        return new EnrollmentEntity(enrollment);
    }

    async findByUserId(userId: number) : Promise<EnrollmentEntity[]> {
        const enrollments = await this.prisma.enrollment.findMany({
            where: {
                userId
            }
        });

        return enrollments.map(enrollment => new EnrollmentEntity(enrollment));
    } 
    
    async findByCourseId(courseId: number) : Promise<UserEntity[]> {
        const enrollments = await this.prisma.enrollment.findMany({
            select: {
                user: true
            },
            where: {
                courseId
            }
        });
    
        return enrollments.map(enrollments => new UserEntity(enrollments.user));
    }
}
