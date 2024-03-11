import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { S3 } from "@aws-sdk/client-s3";

@Injectable()
export class ImagesUploadService {
    constructor(private readonly configService: ConfigService) {
        // s3 설정
        this.NCLOUD_STORAGE_BUCKET_NAME = this.configService.get<string>('NCLOUD_STORAGE_BUCKET_NAME');
        this.NCLOUD_STORAGE_FOLDER_NAME = this.configService.get<string>('NCLOUD_STORAGE_FOLDER_NAME');
        this.NCLOUD_STORAGE_ENDPOINT = this.configService.get<string>('NCLOUD_STORAGE_ENDPOINT');
        this.s3 = new S3({
            endpoint: this.NCLOUD_STORAGE_ENDPOINT,
            region: this.configService.get<string>('NCLOUD_STORAGE_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('NCLOUD_STORAGE_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('NCLOUD_STORAGE_SECRET_KEY')
            }
        });
    }

    private readonly NCLOUD_STORAGE_ENDPOINT: string;
    private readonly NCLOUD_STORAGE_BUCKET_NAME: string;
    private readonly NCLOUD_STORAGE_FOLDER_NAME: string;

    private readonly s3: S3;

    async upload(bufferImage: Buffer, ext: string)
        : Promise<{
            imageUrl: string,
            ETag: string
        }> {
        // 버킷내 이미지가 저장될 경로
        const imageDir = `${this.NCLOUD_STORAGE_FOLDER_NAME}/${randomUUID()}.${ext}`;

        // upload file
        const { ETag } = await this.s3.putObject({
            Bucket: this.NCLOUD_STORAGE_BUCKET_NAME,
            Key: imageDir,
            ACL: 'public-read', // ACL을 지우면 전체 공개되지 않습니다.
            ContentType: `image/${ext}`,
            Body: bufferImage
        });

        // 이미지 url : 엔드포인트/버킷/경로
        const imageUrl = `${this.NCLOUD_STORAGE_ENDPOINT}/${this.NCLOUD_STORAGE_BUCKET_NAME}/${imageDir}`;
        return { imageUrl, ETag };
    }
}
