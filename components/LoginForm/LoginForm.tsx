"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [loginData, setLoginData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  function handleLogin() {
    signIn("credentials", {
      username: loginData.username,
      password: loginData.password,
      redirect: true,
      callbackUrl: "/admin",
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="text-gray-900" htmlFor="username">
        Username
      </label>
      <input
        onChange={(e) =>
          setLoginData({ ...loginData, username: e.target.value })
        }
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
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        className="py-2 px-4 rounded-md text-gray-900 placeholder:text-gray-400 ring-1 ring-inset ring-gray-300"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-md"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
