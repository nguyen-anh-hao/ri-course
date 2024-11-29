import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MentorPermissionDto } from "./dtos/mentor-permissions.dto";
import { $Enums } from "@prisma/client";

@Injectable()
export class MentorPermissionsService {
    constructor(private prisma : PrismaService) {}

    async assign(mentorPermissionDto : MentorPermissionDto) {
        const { mentorId } = mentorPermissionDto;
        const mentor = await this.prisma.user.findUnique({
            where: {
                id: mentorId
            }
        });

        if (!mentor)
            throw new BadRequestException("Mentor not exists");

        if (!mentor.roles.includes($Enums.Role.Mentor))
            throw new BadRequestException("User is not a Mentor");

        return await this.prisma.mentorPermission.create({
            data: mentorPermissionDto
        })
    }

    async unassign(mentorPermissionDto : MentorPermissionDto) {
        await this.prisma.mentorPermission.delete({
            where: {
                mentorId_courseId: mentorPermissionDto
            }
        })
    }

    async findAll() {
        return await this.prisma.mentorPermission.findMany();
    }

    async isMentorPermitted(mentorId: number, courseId: number) {
        const permission = await this.prisma.mentorPermission.findUnique({
            where: {
                mentorId_courseId: {
                    mentorId,
                    courseId
                }
            }
        });

        return !!permission;
    }
}