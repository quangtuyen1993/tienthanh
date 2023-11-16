import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION ?? '',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_SECRET_KEY ?? '',
    }
})

const bucketName = process.env.AWS_BUCKET_NAME

class ASWService {
    static async putFile(file: File) {
        var buffer = Buffer.from(await file.arrayBuffer())
        const params: PutObjectCommandInput = {
            Bucket: bucketName,
            
            Key: file.name,
            Body: buffer,
        };

        const command = new PutObjectCommand(params);
        return await s3.send(command)
    }
}

export default ASWService;