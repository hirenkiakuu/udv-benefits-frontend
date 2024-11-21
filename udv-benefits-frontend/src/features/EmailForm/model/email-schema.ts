import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Введите корректную почту"),
});

export type EmailFormData = z.infer<typeof emailSchema>;
