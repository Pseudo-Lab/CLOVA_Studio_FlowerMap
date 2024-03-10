import { BadRequestException, Injectable } from '@nestjs/common';
import * as heicDecode from 'heic-decode';
import * as sharp from 'sharp';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';

@Injectable()
export class ImagesEditingService {
    private readonly SUPPORTED_FORMAT = ['jpeg', 'png', 'webp'];
    private readonly HEIF_C_FORMATS = ['heif', 'heic']

    private async decodeHeic(bufferImage: Buffer): Promise<{ width: number, height: number, data: Uint8ClampedArray }> {
        return await heicDecode({ buffer: bufferImage });
    }

    async editImage(bufferImage: Buffer, format: string, width: number, height: number): Promise<Buffer> {
        format = format.toLowerCase();
        if (!this.SUPPORTED_FORMAT.includes(format)) {
            throw new BadRequestException(CustomErrorCode.IMAGE_UNSUPPORTED_FORMAT);
        }

        // 메타데이터 수집
        const { format: originFormat, width: originWidth, height: originHeight } = await sharp(bufferImage).metadata();

        // heif, heic 인 경우 raw파일로 디코딩 후 변환 후 리사이징
        if (this.HEIF_C_FORMATS.includes(originFormat.toLowerCase())) {
            const { data } = await this.decodeHeic(bufferImage);
            return await sharp(data, { raw: { width: originWidth, height: originHeight, channels: 4 } })
                .toFormat(sharp.format[format]) // heif 로 가려면 {compression:'av1'}
                .resize(width, height)
                .toBuffer();

        } else { // 그 외의 경우 바로 변환 후 리사이징
            return await sharp(bufferImage)
                .toFormat(sharp.format[format])
                .resize(width, height)
                .toBuffer();
        }
    }
}
