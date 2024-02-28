import LabelSelector from "@/components/Labels/LabelSelector";
import MealList from "@/components/Meals/MealList";
import PassengerSelection from "@/components/Passanger/PassengerSelection";
import { getLabels, getMeals } from "@/lib/api";
import { LABEL_ALL, LABEL_ALL_ID } from "@/lib/constants";

export default async function Home() {
  const meals = await getMeals();
  const labels = [LABEL_ALL, ...(await getLabels())];

  return (
    <main className="w-screen p-24 flex flex-row justify-between">
      <div className="flex flex-col gap-2">
        <LabelSelector labels={labels} />
        <MealList meals={meals} />
      </div>
      <div>
        <PassengerSelection />
      </div>
    </main>
  );
}
