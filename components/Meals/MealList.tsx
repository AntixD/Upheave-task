"use client";

import { MealDrinkLabel, MealWithDrinks } from "@/types";
import MealCard from "./MealCard";
import { selectedLabelsAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { LABEL_ALL_ID } from "@/lib/constants";
import { Suspense } from "react";

function MealList({ meals }: { meals: MealDrinkLabel[] }) {
  const [selectedLabels] = useAtom(selectedLabelsAtom);

  function filterMeals() {
    if (selectedLabels.includes(LABEL_ALL_ID)) return meals;
    return meals.filter((meal) =>
      selectedLabels.some((label) =>
        meal.labels.map((mealLabel) => mealLabel.id).includes(label)
      )
    );
  }

  return (
    <>
      <Suspense fallback={<div>Loading meals...</div>}>
        {filterMeals().map((meal) => {
          return <MealCard key={meal.id} meal={meal} />;
        })}
      </Suspense>
    </>
  );
}

export default MealList;
