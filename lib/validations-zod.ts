import { z } from "zod";

export const credentialsSchema = z.object({
  user: z.string(),
  password: z.string().min(1),
});
