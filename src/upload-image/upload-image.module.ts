import { Module } from '@nestjs/common';
import { UploadImageService } from './upload-image.service';
import { uploadImageProvider } from './upload-image';

@Module({
  providers: [UploadImageService, uploadImageProvider],
  exports: [UploadImageService, uploadImageProvider]
})
export class UploadImageModule {}
