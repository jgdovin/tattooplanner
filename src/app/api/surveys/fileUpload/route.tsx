import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  SURVEY_UPLOAD_BUCKET_NAME: bucketName,
} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !bucketName) {
  throw new Error("Missing required environment variables");
}

// S3 Client configuration
const s3Client = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req: Request) {
  if (!bucketName) throw new Error("Missing required environment variable");
  const body = await req.formData();

  const uploadPromises: Promise<any>[] = [];

  for (const [key, value] of body.entries()) {
    if (value instanceof File) {
      // Case 1 and Case 2: Single file or multiple unique files
      uploadPromises.push(uploadFileToS3(value, bucketName, key));
    } else if (Array.isArray(value)) {
      // Case 3: Multiple files with the same name, increment the file names
      value.forEach((file, index) => {
        if (file instanceof File) {
          const incrementedName = addIncrementToFilename(file.name, index);
          uploadPromises.push(
            uploadFileToS3(file, bucketName, incrementedName)
          );
        }
      });
    }
  }

  try {
    // Wait for all uploads to complete
    await Promise.all(uploadPromises);
    return new Response(
      JSON.stringify({ message: "Files uploaded successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading files:", error);
    return new Response(JSON.stringify({ error: "File upload failed" }), {
      status: 500,
    });
  }
}

async function uploadFileToS3(
  file: File,
  bucketName: string,
  fileName: string
) {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);
  const uploadParams = {
    Bucket: bucketName,
    Key: `${Date.now()}-${fileName}`, // Ensure unique key (filename)
    Body: buffer,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(uploadParams);
  return s3Client.send(command);
}

// Function to add an increment to the file name (e.g., file.png -> file-1.png, file-2.png)
function addIncrementToFilename(fileName: string, index: number): string {
  const fileParts = fileName.split(".");
  const baseName = fileParts.slice(0, -1).join("."); // File name without extension
  const extension = fileParts[fileParts.length - 1]; // File extension

  return `${baseName}-${index + 1}.${extension}`;
}
