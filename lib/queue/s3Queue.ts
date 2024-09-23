import { sendToQueue } from "./sqsQueue";

interface S3OperationData {
  data?: any;
  userId: string;
  prefixNameFile: string;
}

export async function queueS3(operationData: S3OperationData) {
  const queueUrl = process.env.S3_OPERATIONS_QUEUE_URL!;

  return sendToQueue(queueUrl, {
    type: "excel-export",
    dataSend: operationData,
  });
}
