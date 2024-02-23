import { registerAs } from '@nestjs/config';

export default registerAs(
  'aws',
  (): Record<string, unknown> => ({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      // sessionToken: process.env.AWS_SESSION_TOKEN,
    },
    s3: {
      bucketName: process.env.AWS_BUCKET_NAME,
      baseUrl: `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}`
    }
  })
);
