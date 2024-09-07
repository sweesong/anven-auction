import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
//import { Readable } from "stream";

export const dynamic = 'force-dynamic'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});


export async function GET(request: Request) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const prefix = "images/"; // If you want to filter files by a prefix

  try {
    // List objects in the S3 bucket
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    });

    const listResponse = await s3.send(listCommand);

    const files = listResponse.Contents?.filter((blob) => (blob.Size || 0) > 0)
                                            .sort((a, b) => {
                                                const dateA = a.LastModified ? new Date(a.LastModified).getTime() : 0;
                                                const dateB = b.LastModified ? new Date(b.LastModified).getTime() : 0;
                                                return dateB - dateA; // Sort in descending order, most recent first
                                            }) || [];

    // To retrieve a specific file's content, use GetObjectCommand
    /*
    if (files.length > 0) {
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: files[0].Key!, // Get the first file for demonstration
      });

      const getObjectResponse = await s3.send(getObjectCommand);

      // Convert the stream to a string (or you can handle it as a buffer)
      const stream = getObjectResponse.Body as Readable;
      let data = "";
      for await (const chunk of stream) {
        data += chunk;
      }

      return NextResponse.json({ files, firstFileContent: data });
    }
    */

    return NextResponse.json(files);
  } catch (error) {
    console.error("Error fetching from S3:", error);
    return NextResponse.json({ error: "Failed to retrieve files" }, { status: 500 });
  }
}
