import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// Initialize the S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  let done: boolean | undefined = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = doneReading;
  }

  return Buffer.concat(chunks);
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (filename && request.body) {
    try {
      const bucketName = process.env.AWS_S3_BUCKET_NAME!;
      const key = `auction_listing/${filename}`;

      // Convert ReadableStream to Buffer
      const bodyBuffer = await streamToBuffer(request.body as ReadableStream<Uint8Array>);

      // Upload the file to S3
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: bodyBuffer,
        ACL: "public-read", // Set ACL to public-read if you want the file to be publicly accessible
      });

      const response = await s3.send(command);

      // Generate a public URL for the uploaded file
      const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      console.log(fileUrl);
      return NextResponse.json({
        message: "File uploaded successfully",
        url: fileUrl,
        ETag: response.ETag,
      });
    } catch (error) {
      console.error("Error uploading to S3:", error);

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
  } else {
    return NextResponse.json({ message: "No file detected" });
  }
}
