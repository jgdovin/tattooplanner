import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export default async function Page() {
  const client = new S3Client({ region: "us-west-2" });
  return <main className="p-10 h-full">hello</main>;
}
