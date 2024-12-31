import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("upload")
export class UploadController {
    constructor(private cloudinaryService: CloudinaryService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            console.log("Error while receiving file")
            return;
        }

        return this.cloudinaryService.uploadFile(file);
    }
}