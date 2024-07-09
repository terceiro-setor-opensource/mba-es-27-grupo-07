import { userSchema } from "@/schemas/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getSessionData() {
  const session = cookies().get("session")?.value;
  return session ? userSchema.parse(JSON.parse(session)) : null;
}

export default async function Home() {
  const me = await getSessionData();

  if (!me) {
    redirect("/auth");
  }

  return <h1>Home</h1>;
}
