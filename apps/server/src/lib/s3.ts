import env from '../env';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3 } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { File as FormDataFile } from 'formdata-node';
import { Buffer } from 'buffer';

const client = new S3({
  forcePathStyle: false,
  endpoint: env.DO_ENDPOINT as string,
  region: 'us-east-1',
  credentials: {
    accessKeyId: env.DO_SPACES_KEY as string,
    secretAccessKey: env.DO_SPACES_SECRET as string
  }
});

export const uploadFileToS3 = async (file: FormDataFile) => {
  try {
    const randomId = randomUUID().split('-')[0];
    const key = `${randomId}-${file.name}`;

    if (file.size > 3_000_000) {
      throw new Error('The file must not exceed 3MB');
    }

    const Body = Buffer.from(await file.arrayBuffer());

    await client.send(
      new PutObjectCommand({
        Bucket: env.DO_BUCKET as string,
        Key: key,
        Body,
        ACL: 'public-read',
        ContentType: file.type
      })
    );

    return key;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('An error occurred while uploading the file');
  }
};

export const getFileUrlByKey = async (key: string) => {
  if (!key) {
    throw new Error('No key provided to getFileUrlByKey');
  }

  if (!env.DO_CDN_ENDPOINT) {
    throw new Error('DO_CDN_ENDPOINT is not configured');
  }

  return env.DO_CDN_ENDPOINT + '/' + key;
};

export const getFileUrlsByKeys = async (keys: string[]) => {
  return await Promise.all(
    keys.map(async (key) => {
      return getFileUrlByKey(key);
    })
  );
};

export const getFileFromS3 = async (key: string) => {
  try {
    if (!key) {
      throw new Error('No key provided to getFileFromS3');
    }

    const command = new GetObjectCommand({
      Bucket: env.DO_BUCKET as string,
      Key: key
    });

    const response = await client.send(command);

    if (!response.Body) {
      throw new Error('File not found');
    }

    // Convertir le stream en buffer
    const chunks: Uint8Array[] = [];
    const reader = response.Body.transformToWebStream().getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);

    return {
      buffer,
      contentType: response.ContentType || 'application/octet-stream',
      contentLength: response.ContentLength || buffer.length
    };
  } catch (error) {
    console.error('Error getting file from S3:', error);
    throw new Error('An error occurred while retrieving the file');
  }
};
