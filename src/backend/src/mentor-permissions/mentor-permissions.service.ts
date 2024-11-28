import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MentorPermissionDto } from "./dtos/mentor-permissions.dto";

@Injectable()
export class MentorPermissionsService {
    constructor(private prisma : PrismaService) {}

    async assign(mentorPermissionDto : MentorPermissionDto) {
        await this.prisma.courseMentor.create({
            data: mentorPermissionDto
        })
    }

    async unassign(mentorPermissionDto : MentorPermissionDto) {
        await this.prisma.courseMentor.delete({
            where: {
                mentorId_courseId: mentorPermissionDto
            }
        })
    }

    async findAll() {
        return await this.prisma.courseMentor.findMany();
    }
}