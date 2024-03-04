import { authOptions } from "@/lib/next-auth";
import { registerUser } from "@/lib/api";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/admin");

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="border-gray-400 border bg-white rounded-lg shadow-lg drop-shadow-lg flex flex-col gap-4 p-8">
        <h1 className="text-3xl text-gray-900 text-center p-4">Register</h1>
        <form className="flex flex-col gap-4" action={registerUser}>
          <label className="text-gray-900" htmlFor="username">
            Username
          </label>
          <input
            className="py-2 px-4 rounded-md text-gray-900 placeholder:text-gray-400 ring-1 ring-inset ring-gray-300"
            placeholder="Username"
            type="text"
            name="username"
            id="username"
          />
          <label className="text-gray-900" htmlFor="password">
            Password
          </label>
          <input
            className="py-2 px-4 rounded-md text-gray-900 placeholder:text-gray-400 ring-1 ring-inset ring-gray-300"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            Register
          </button>
        </form>
        <Link
          href={"login"}
          className="text-gray-900 text-center p-2 rounded-md hover:underline underline-offset-2"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
