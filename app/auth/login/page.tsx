import { authOptions } from "@/lib/next-auth";
import LoginForm from "@/components/LoginForm/LoginForm";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/admin");

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="border-gray-400 border bg-white rounded-lg shadow-lg drop-shadow-lg flex flex-col gap-4 p-8">
        <h1 className="text-3xl text-gray-900 text-center p-4">Login</h1>
        <LoginForm />
        <Link
          href={"register"}
          className="text-gray-900 text-center p-2 rounded-md hover:underline underline-offset-2"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
