"use client";

import { useRouter } from "next/navigation";

function Button() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  return (
    <div>
      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  );
}

export default Button;
