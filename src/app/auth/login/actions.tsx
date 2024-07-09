"use server";

import { userSchema } from "@/schemas/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: userSchema.shape.email,
  password: userSchema.shape.password,
});
const apiResponseSchema = z.record(z.string(), userSchema.omit({ id: true }));

export async function handleLogin(formData: FormData) {
  const userData = loginSchema.parse(Object.fromEntries(formData));

  // TODO: Move URL to .env
  const result = await fetch(
    `https://condominio-conectado-app-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${userData.email}"`,
    {
      method: "GET",
    }
  );

  if (!result.ok) {
    return { error: "Falha no login." };
  }

  const usersMatch = Object.entries(
    apiResponseSchema.parse(await result.json())
  );

  if (usersMatch.length === 0) {
    return { error: "Usuário não encontrado." };
  }

  const [id, user] = usersMatch[0];

  if (user.password !== userData.password) {
    return { error: "Senha inválida." };
  }

  cookies().set(
    "session",
    JSON.stringify(
      userSchema.parse({
        id,
        ...user,
      })
    ),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    }
  );

  redirect("/");
}
