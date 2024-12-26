import { ApiProperty } from "@nestjs/swagger";
import { AuditLog } from "@prisma/client";

export class AuditLogEntity implements AuditLog{
    constructor(partial: Partial<AuditLogEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty({
        description: "ID của bản ghi log",
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: "Thời gian tạo bản ghi log",
        example: new Date(),
    })
    createdAt: Date;

    @ApiProperty({
        description: "ID của người dùng bị thay đổi",
        example: 1,
    })
    userId: number;

    @ApiProperty({
        description: "ID của admin thực hiện thay đổi",
        example: 5,
    })
    adminId: number;

    @ApiProperty({
        description: "Dữ liệu trước khi thay đổi",
        example: {
            username: "user1",
            email: "user1@ricourse.com",
            roles: ["Learner"],
        },
    })
    before: Record<string, any>;

    @ApiProperty({
        description: "Dữ liệu sau khi thay đổi",
        example: {
            username: "user1",
            email: "user1new@ricourse.com",
            roles: ["Learner"],
        },
    })
    after: Record<string, any>;

    actionType: string;
}
