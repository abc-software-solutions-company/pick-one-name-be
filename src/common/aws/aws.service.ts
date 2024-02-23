import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { IConfigs } from '@/common/interfaces';

import { getTempUploadBucketPath } from '../utils/file.util';

@Injectable()
export class AwsS3Service {
  private readonly s3Client: S3Client;
  private readonly bucket?: string;
  private readonly logger = new Logger(AwsS3Service.name);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly ACL = 'public-read';

  constructor(private readonly configService: ConfigService<IConfigs>) {
    const awsConfig: IConfigs['aws'] | undefined = this.configService.get('aws');
    const appConfig: IConfigs['app'] | undefined = this.configService.get('app');

    this.bucket = awsConfig?.s3.bucketName;
    if (appConfig?.env === 'DEVELOPMENT') {
      if (awsConfig) {
        this.s3Client = new S3Client({
          region: awsConfig.region,
          endpoint: awsConfig.endpoint,
          forcePathStyle: true,
          credentials: {
            accessKeyId: awsConfig.credentials.accessKeyId,
            secretAccessKey: awsConfig.credentials.secretAccessKey
          }
        });
      }
    } else {
      this.s3Client = new S3Client({
        region: awsConfig?.region,
        endpoint: awsConfig?.endpoint,
        forcePathStyle: true
      });
    }
  }

  async generatePresignedURL(fileName: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Key: getTempUploadBucketPath(fileName),
        Bucket: this.bucket
      });
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 5 * 60 // 5 minutes,
      });

      return url;
    } catch (error) {
      this.logger.log(`AwsS3Service generatePresignedURL error: ${error.message}`);
      throw error;
    }
  }

  async downloadFileFromS3(s3ObjectKey: string): Promise<GetObjectCommandOutput> {
    try {
      const command = new GetObjectCommand({
        Key: s3ObjectKey,
        Bucket: this.bucket
      });
      const data = await this.s3Client.send(command);

      return data;
    } catch (error) {
      this.logger.log(`AwsS3Service downloadFileFromS3 error: ${error.message}`);
      throw error;
    }
  }

  // async uploadFileToS3(
  //   bucketFilePath: string,
  //   fileStream: PutObjectCommandInput['Body'],
  //   contentType?: PutObjectCommandInput['ContentType']
  // ): Promise<void> {
  //   const parrallelUploadS3 = new Upload({
  //     client: this.s3Client,
  //     params: {
  //       Bucket: this.bucket,
  //       Key: bucketFilePath,
  //       Body: fileStream,
  //       ContentType: contentType,
  //       ACL: this.ACL
  //     }
  //   });
  //   parrallelUploadS3.on('httpUploadProgress', progress => {
  //     this.logger.log(`AwsS3Service - uploadFileToS3 progress: ${progress}`);
  //   });

  //   await parrallelUploadS3.done();
  // }

  async removeS3Object(bucketFilePath: string): Promise<DeleteObjectCommandOutput> {
    try {
      const command = new DeleteObjectCommand({
        Key: bucketFilePath,
        Bucket: this.bucket
      });
      const data = await this.s3Client.send(command);

      return data;
    } catch (error) {
      this.logger.log(`AwsS3Service removeS3Object error: ${error.message}`);
      throw error;
    }
  }

  async createPresignedPost(fileName: string, contentType: string) {
    try {
      const res = await createPresignedPost(this.s3Client, {
        Bucket: this.bucket as string,
        Key: getTempUploadBucketPath(fileName),
        Expires: 60,
        Fields: {
          acl: 'public-read',
          'Content-Type': contentType
        },
        Conditions: [
          ['eq', '$Content-Type', contentType],
          ['content-length-range', 1, 26214400] // 5MB - TODO: move this to config
        ]
      });

      return res;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getObjectMeta(bucketPath: string) {
    try {
      const command = new HeadObjectCommand({
        Key: bucketPath,
        Bucket: this.bucket
      });

      const res = await this.s3Client.send(command);

      return res;
    } catch (error) {
      this.logger.log(`AwsS3Service getObjectMeta error: ${error.message}`);
      throw new BadRequestException(`Object is not exist or invalid.`);
    }
  }

  async copyObject(currentPath: string, newPath: string) {
    try {
      const copyCommand = new CopyObjectCommand({
        Bucket: this.bucket,
        Key: newPath,
        CopySource: `${this.bucket}/${currentPath}`,
        ACL: this.ACL
      });

      await this.s3Client.send(copyCommand);

      // remove object
      // TODO: Currently, don't remove image because of quiz setting overview in FE don't fetch new image link after press complete button.
      // If we fetch data again, it may be cause heavy load on backend and increase time to waiting quiz setting page loaded.
      // await this.removeS3Object(currentPath);
    } catch (error) {
      this.logger.log(`AwsS3Service getObjectMeta error: ${error.message}`);
      throw error;
    }
  }
}
