import Button from "@/components/Button/Button";
import LabelSelector from "@/components/Labels/LabelSelector";
import MealList from "@/components/Meals/MealList";
import PassengerSelection from "@/components/Passanger/PassengerSelection";
import { getLabels, getMeals } from "@/lib/api";
import { LABEL_ALL } from "@/lib/constants";

export default async function Home() {
  const meals = await getMeals();
  const labels = [LABEL_ALL, ...(await getLabels())];

  return (
    <main className="w-screen p-12 flex flex-row justify-between gap-8">
      <div className="flex flex-col gap-12 w-4/5">
        <LabelSelector labels={labels} />
        <MealList meals={meals} />
      </div>
      <Button />
      <div>
        <PassengerSelection />
      </div>
    </main>
  );
}
