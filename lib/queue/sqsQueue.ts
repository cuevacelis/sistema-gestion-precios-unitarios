import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

// Crear una instancia del cliente SQS
const sqs = new SQSClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Envía un mensaje a una cola SQS específica
 * @param queueUrl La URL de la cola SQS
 * @param messageBody El cuerpo del mensaje a enviar
 * @returns Una promesa que se resuelve con el ID del mensaje en la cola
 * @throws Error si falla el envío del mensaje a la cola
 */
export async function sendToQueue(
  queueUrl: string,
  messageBody: any
): Promise<string> {
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(messageBody),
  });

  try {
    const response = await sqs.send(command);
    return response.MessageId!;
  } catch (error) {
    throw new Error("Failed to queue message");
  }
}
