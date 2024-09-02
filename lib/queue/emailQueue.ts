// lib/queue/emailQueue.ts
import { sendToQueue } from "./sqsQueue";

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function queueEmail(emailData: EmailData): Promise<string> {
  const queueUrl = process.env.SQS_QUEUE_URL!;
  return sendToQueue(queueUrl, { type: "email", data: emailData });
}
