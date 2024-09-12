import { GetObjectAclCommand, S3Client } from "@aws-sdk/client-s3"
import { Bucket, S3AccessKey, S3Secret } from "../../constants"
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: S3AccessKey,
        secretAccessKey: S3Secret
    }
})
async function uploadFile(file, folderName) {
    try {
        const newName=Date.now()+"."+ file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
        
        const uploadCommand = new PutObjectCommand({
            Bucket: Bucket,
            Key: folderName ? `${folderName}/${newName}` : newName,
            Body: file,
        });
        const response = await s3Client.send(uploadCommand);
        if (response.$metadata.httpStatusCode !== 200) {
            throw new Error('Failed to upload file to S3');
        }

        const imageUrl = `https://${Bucket}.s3.amazonaws.com/${folderName ? folderName + '/' : ''}${newName}`;
        return imageUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

async function getObjectUrl(key) {
    const command = new GetObjectAclCommand({
        Bucket: Bucket,
        Key: key

    })
    const url = await getSignedUrl(s3Client, command)
    return url
}
export { uploadFile, getObjectUrl }