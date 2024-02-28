import LabelSelector from "@/components/Labels/LabelSelector";
import { getLabels, getMeals } from "@/lib/api";
import { LABEL_ALL } from "@/lib/constants";

export default async function Home() {
  const meals = await getMeals();
  const labels = [LABEL_ALL, ...(await getLabels())];

  return (
    <main className="w-screen p-24 flex flex-row justify-between">
      <div className="flex flex-col gap-2">
        <LabelSelector labels={labels} /> <div>Meals</div>
      </div>
      <div>Select meal</div>
    </main>
  );
}
