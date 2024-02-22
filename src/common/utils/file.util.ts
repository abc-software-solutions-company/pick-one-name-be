import crypto from 'crypto';
import mime from 'mime';
import path from 'path';
import slugify from 'slugify';

import { BG_FOLDER, TEMP_UPLOAD_FOLDER } from '../constants';

export const nameToSlug = (name: string) => slugify(name);

export const getFileType = (fileName: string): string => mime.getType(fileName) ?? '';

export const getFileExtension = (fileName: string): string => {
  let ext = path.extname(fileName);

  if (!ext) {
    ext = `.${mime.getExtension(getFileType(fileName))}`;
  }

  return ext;
};

export const getBasename = (fileName: string, ext: string): string => path.basename(fileName, ext);

export const randomSuffix = (): string => crypto.randomBytes(5).toString('hex');

export const generateFileName = (fileName: string): string => {
  return `${fileName.split('.')[0]}-${new Date().getTime()}.${fileName.split('.')[1]}`;
};

export const getTempUploadBucketPath = (fileBucketPath: string): string => {
  return `${TEMP_UPLOAD_FOLDER}/${fileBucketPath}`;
};

export const getHotelBucketPath = (userId?: string, fileBucketPath?: string): string => {
  return `${BG_FOLDER}/${userId}/${fileBucketPath}`;
};

export const generateFileNameWithHash = (fileName: string): string => {
  const baseName = getBasename(fileName, getFileExtension(fileName));
  const baseNameToSlug = nameToSlug(baseName);

  return `${baseNameToSlug}-${randomSuffix()}`;
};

export const bytesToKbytes = (bytes: number) => Math.round((bytes / 1000) * 100) / 100;
