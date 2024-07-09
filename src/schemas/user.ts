import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z
    .string({ message: "Nome inválido." })
    .min(3, { message: "Nome deve ter mais de 3 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  password: z
    .string({ message: "Senha inválida." })
    .min(6, { message: "Senha deve ter mais de 6 caracteres." }),
  phoneNumber: z.string().regex(/^\d{11}$/, {
    message: "Número de telefone inválido.",
  }),
  apartment: z.coerce
    .number()
    .int()
    .positive({ message: "Número de apartamento inválido." }),
  block: z.string().min(1, { message: "Bloco obrigatório." }),
});
export type User = z.infer<typeof userSchema>;
