import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },

});

export async function POST(request: Request): Promise<NextResponse> {

    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (file && file instanceof File) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = await uploadFileToS3(buffer, file.name);

            return NextResponse.json({ success: true, file: file.name });
        } else {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: "Failed to upload file", error: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { message: "Failed to upload file", error: String(error) },
                { status: 500 }
            );
        }
    }
}

async function uploadFileToS3(buffer: Buffer, fileName: string) {

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: "images/" + fileName,
        Body: buffer,
        ContentType: "image/jpg",
        ACL: 'public-read', // Set ACL to allow public read access (optional)
    });

    const response = await client.send(command);

    console.log('File uploaded successfully:', response);
    return fileName;
}
