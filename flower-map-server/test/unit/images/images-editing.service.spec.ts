import { Test, TestingModule } from '@nestjs/testing';
import { ImagesEditingService } from '../../../src/modules/images/images-editing.service';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as sharp from 'sharp';
import { CustomErrorCode } from 'src/common/exception/custom-error-code';
import { CustomHttpException } from 'src/common/exception/custom-http-exception';

describe('ImagesEditingService', () => {
  let service: ImagesEditingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesEditingService],
    }).compile();

    service = module.get<ImagesEditingService>(ImagesEditingService);
  });

  describe('editImage', () => {
    it('heic 이미지를 입력받아 jpeg로 변환 후 입력된 값으로 리사이징한다.', async () => {
      // given
      const bufferImage = readFileSync(join(__dirname, '..', '..', 'static', 'test-image.heic'));
      const ext = 'jpeg';
      const width = 540;
      const height = 540;

      // when
      const editedImage = await service.editImage(bufferImage, ext, width, height);

      // then
      const editedMetadata = await sharp(editedImage).metadata();
      expect(editedMetadata.format).toEqual(ext);
      expect(editedMetadata.width).toEqual(width);
      expect(editedMetadata.height).toEqual(height);
    });

    it('jpeg 이미지를 입력받아 png로 변환 후 입력된 값으로 리사이징한다.', async () => {
      // given
      const bufferImage = readFileSync(join(__dirname, '..', '..', 'static', 'test-image.jpeg'));
      const ext = 'png';
      const width = 540;
      const height = 540;

      // when
      const editedImage = await service.editImage(bufferImage, ext, width, height);

      // then
      const editedMetadata = await sharp(editedImage).metadata();
      expect(editedMetadata.format).toEqual(ext);
      expect(editedMetadata.width).toEqual(width);
      expect(editedMetadata.height).toEqual(height);
    });

    it('지원하지 않는 타입으로의 변환을 요구할 경우 IUE400 예외를 발생시킨다.', () => {
      // given
      const bufferImage = Buffer.from('mock-buffer');
      const ext = 'gif';
      const width = 540;
      const height = 540;

      // when
      // then
      expect(service.editImage(bufferImage, ext, width, height))
        .rejects
        .toThrow(new CustomHttpException(CustomErrorCode.IMAGE_UNSUPPORTED_EXT));
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
