"use server";

import Link from "next/link";

export default async function Button() {
  return (
    <div>
      <Link href="/auth/login">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg">
          Login
        </button>
      </Link>
    </div>
  );
}
