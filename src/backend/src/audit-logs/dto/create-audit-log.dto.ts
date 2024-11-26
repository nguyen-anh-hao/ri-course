import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateAuditLogDto {
    @IsNotEmpty()
    @IsString()
    actionType: number;

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    adminId: number;

    @IsObject()
    before: Object;

    @IsObject()
    after: Object;
}
