import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AwsS3Service } from '@/common/aws/aws.service';

import { generateFileName, getTempUploadBucketPath } from '@/common/utils';

import { UUIDParam } from '@/common/decorators';

import { GeneratePresignedUrlDoc } from './docs/file.doc';
import { PostPresignedResponseDto, PresignedUrlResponseDto, RequestPresignedUrlDto } from './dto';
import { MediaService } from './media.service';

@ApiTags('Media')
@ApiBearerAuth()
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService, private readonly awsS3Service: AwsS3Service) {}

  @Post('presigned-url')
  @HttpCode(HttpStatus.CREATED)
  async requestPresignedUrl(@Body() requestPresignedUrlDto: RequestPresignedUrlDto): Promise<PresignedUrlResponseDto> {
    const fileBucketPath = generateFileName(requestPresignedUrlDto.fileName);
    const url = await this.awsS3Service.generatePresignedURL(fileBucketPath);

    return {
      url: url?.toString(),
      key: getTempUploadBucketPath(fileBucketPath)
    };
  }

  @Post('post-presigned')
  @HttpCode(HttpStatus.CREATED)
  @GeneratePresignedUrlDoc()
  async postPresigned(@Body() requestPresignedUrlDto: RequestPresignedUrlDto): Promise<PostPresignedResponseDto> {
    const Media = await this.mediaService.createTempFile({
      fileName: requestPresignedUrlDto.fileName
    });

    const fileName = `${Media.hash}${Media.ext}`;
    const res = await this.awsS3Service.createPresignedPost(fileName, Media.mime);

    return {
      ...res,
      file: Media
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOneById(@UUIDParam('id') id: string) {
    return this.mediaService.findOneById(id);
  }
}
