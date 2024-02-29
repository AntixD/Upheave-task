import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/next-auth";
import MealAdmin from "@/components/Admin/MealAdmin";
import { getMeal } from "@/lib/api";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  const meal = await getMeal();

  if (!session) redirect("/auth/login");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MealAdmin meals={meal} />
    </main>
  );
}
