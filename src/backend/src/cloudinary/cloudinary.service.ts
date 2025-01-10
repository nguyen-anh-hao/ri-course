import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
const streamifier = require("streamifier");

@Injectable()
export class CloudinaryService {

    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        const result = await new Promise<UploadApiResponse | UploadApiErrorResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'ricourse',
                    resource_type: 'raw'
                },
                (error, result) => {
                    if (error) 
                        return reject(error);
                    
                    resolve(result);
                },
            );

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        return result;
    }

    async updateFile(file: Express.Multer.File, oldUrl: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: oldUrl,
                    folder: 'ricourse',
                    resource_type: 'raw',
                    overwrite: true,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                },
            );

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        return result;
    }

    async uploadText(content: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        const result = await new Promise<UploadApiResponse | UploadApiErrorResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'ricourse',
                    resource_type: 'raw'
                },
                (error, result) => {
                    if (error) 
                        return reject(error);
                    
                    resolve(result);
                },
            );

            streamifier.createReadStream(Buffer.from(content, 'utf-8')).pipe(uploadStream);
        });

        return result;
    }

    async updateText(content: string, oldUrl: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    public_id: oldUrl,
                    folder: 'ricourse',
                    resource_type: 'raw',
                    overwrite: true,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                },
            );

            streamifier.createReadStream(Buffer.from(content, 'utf-8')).pipe(uploadStream);
        });

        return result;
    }

    async deleteFile(publicId: string) {
        return await cloudinary.uploader.destroy(publicId);
    }
}