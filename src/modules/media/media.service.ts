import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AwsS3Service } from '@/common/aws/aws.service';

import { IConfigs } from '@/common/interfaces';

import { generateFileNameWithHash, getFileExtension, getFileType, getTempUploadBucketPath } from '@/common/utils';

import { CreateMediaDto } from './dto/create-media.dto';
import { MediaEntity } from './entities/media.entity';

@Injectable()
export class MediaService {
  private readonly s3BaseUrl: any;
  private readonly logger = new Logger(MediaService.name);

  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
    private readonly configService: ConfigService<IConfigs>,
    private readonly awsS3Service: AwsS3Service
  ) {
    const awsConfig: IConfigs['aws'] | undefined = this.configService.get('aws');

    this.s3BaseUrl = awsConfig?.s3.baseUrl;
  }

  async createTempFile(createMediaDto: CreateMediaDto): Promise<MediaEntity> {
    const { fileName } = createMediaDto;
    const newMedia = new MediaEntity();

    const hash = generateFileNameWithHash(fileName);
    const ext = getFileExtension(fileName);
    const mimeType = getFileType(fileName);
    const tempPath = getTempUploadBucketPath(`${hash}${ext}`);
    const tempUrl = `${this.s3BaseUrl}/${tempPath}`;

    newMedia.name = fileName;
    newMedia.alt = fileName;
    newMedia.url = tempUrl;
    newMedia.isTemp = true;
    newMedia.hash = hash;
    newMedia.ext = ext;
    newMedia.mime = mimeType;

    try {
      const entity = await this.mediaRepository.save(newMedia);

      return entity;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(fileId: string): Promise<MediaEntity> {
    const media = await this.mediaRepository.createQueryBuilder('file').where('file.id = :fileId', { fileId }).getOne();

    if (!media) {
      throw new NotFoundException(`Not found file with ID: ${fileId}`);
    }

    return media;
  }

  async tempFileToRealFile(updateEntity: MediaEntity, newPath: string): Promise<MediaEntity> {
    this.mediaRepository.merge(updateEntity, {
      url: `${this.s3BaseUrl}/${newPath}`
    });

    return this.mediaRepository.save(updateEntity);
  }

  async handleMoveFile(fileName: string, newPath: string, media: MediaEntity): Promise<MediaEntity> {
    try {
      const tempPath = getTempUploadBucketPath(fileName);
      const s3ObjectMeta = await this.awsS3Service.getObjectMeta(tempPath);

      await this.awsS3Service.copyObject(tempPath, newPath);
      // TODO: Currently, don't remove image because of quiz setting overview in FE don't fetch new image link after press complete button.
      // If we fetch data again, it may be cause heavy load on backend and increase time to waiting quiz setting page loaded.
      // await this.awsS3Service.removeS3Object(tempPath);
      media.size = s3ObjectMeta.ContentLength;
      media.isTemp = false;
      this.logger.log(`handleMoveFile newPath: ${newPath}`);
      const updatedMedia = await this.tempFileToRealFile(media, newPath);

      return updatedMedia;
    } catch (error) {
      this.logger.log(`handleMoveFile error: ${error.message}`);
      throw error;
    }
  }

  // async handleQuizFile(folderName: string | undefined, fileId: string | undefined): Promise<MediaEntity> {
  //   try {
  //     const media = await this.findOneById(fileId as string);

  //     if (!media.isTemp) {
  //       return media;
  //     }

  //     const fileName = `${media.hash}${media.ext}`;
  //     const newPath = getQuizBucketPath(folderName, fileName);
  //     const updatedMedia = await this.handleMoveFile(fileName, newPath, media);

  //     return updatedMedia;
  //   } catch (error) {
  //     this.logger.log(`handleQuizFile error: ${error.message}`);
  //     throw error;
  //   }
  // }

  // async handleQuestionFile(fileId: string): Promise<MediaEntity> {
  //   try {
  //     const media = await this.findOneById(fileId);

  //     if (!media.isTemp) {
  //       return media;
  //     }

  //     const fileName = `${media.hash}${media.ext}`;
  //     const newPath = getQuestionBucketPath(fileName);
  //     const updatedMedia = await this.handleMoveFile(fileName, newPath, media);

  //     return updatedMedia;
  //   } catch (error) {
  //     this.logger.log(`handleQuestionFile error: ${error.message}`);
  //     throw error;
  //   }
  // }

  // async handleUserFile(fileId: string): Promise<MediaEntity> {
  // try {
  //   const media = await this.findOneById(fileId);
  //   if (!media.isTemp) {
  //     return MediaEntity;
  //   }
  //   const fileName = `${media.hash}${media.ext}`;
  // const newPath = getUserBucketPath(fileName);
  //   const updatedMedia = await this.handleMoveFile(fileName, newPath, media);
  //   return updatedMediaEntity;
  // } catch (error) {
  //   this.logger.log(`handleUserFile error: ${error.message}`);
  //   throw error;
  // }
  // }
}
