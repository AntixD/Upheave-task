"use client";

import { MealDrinkLabel } from "@/types";
import MealCard from "./MealCard";
import { selectedLabelsAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { LABEL_ALL_ID } from "@/lib/constants";
import { Suspense } from "react";
import React from "react";
import { getMeals } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

function MealList({ meals: data }: { meals: MealDrinkLabel[] }) {
  const [selectedLabels] = useAtom(selectedLabelsAtom);

  const { data: meals } = useQuery({
    queryKey: ["meals"],
    queryFn: () => getMeals(),
    initialData: data,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  if (!meals) return <div>Loading ...</div>;

  function filterMeals() {
    if (selectedLabels.includes(LABEL_ALL_ID)) return meals;
    return meals.filter((meal) =>
      selectedLabels.some((label) =>
        meal.labels.map((mealLabel) => mealLabel.id).includes(label)
      )
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      <Suspense fallback={<div>Loading meals...</div>}>
        {filterMeals().map((meal) => {
          return <MealCard key={meal.id} meal={meal} />;
        })}
      </Suspense>
    </div>
  );
}

export default React.memo(MealList);
