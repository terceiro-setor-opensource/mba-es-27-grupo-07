import { userSchema } from "@/schemas/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
  const user = userSchema.parse(Object.fromEntries(formData));
  cookies().set("session", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  redirect("/");
}
