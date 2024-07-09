"use server";

import { userSchema } from "@/schemas/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
  name: userSchema.shape.name,
  email: userSchema.shape.email,
  password: userSchema.shape.password,
  phoneNumber: userSchema.shape.phoneNumber,
  apartment: userSchema.shape.apartment,
  block: userSchema.shape.block,
});

export async function handleSignIn(formData: FormData) {
  const userData = signInSchema.parse(Object.fromEntries(formData));

  // TODO: Move URL to .env
  const result = await fetch(
    "https://condominio-conectado-app-default-rtdb.firebaseio.com/users.json",
    {
      method: "POST",
      body: JSON.stringify(userData),
    }
  );

  if (!result.ok) {
    return { error: "Falha ao cadastrar usuário." };
  }

  cookies().set(
    "session",
    JSON.stringify(
      userSchema.parse({
        id: (await result.json()).name,
        ...userData,
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
