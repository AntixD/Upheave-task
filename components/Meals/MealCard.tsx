"use client";

import { passengersAtom, selectedPassangerAtom } from "@/lib/state";
import type { Drink, Meal } from "@prisma/client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

function MealCard({ meal }: { meal: Meal & { drinks: Drink[] } }) {
  const [_, setPassangers] = useAtom(passengersAtom);
  const [selectedPassanger] = useAtom(selectedPassangerAtom);

  const [selectedDrink, setSelectedDrink] = useState<Drink | undefined>();

  function handleMealSelected() {
    const { drinks: _, ...mealWithoutDrinks } = meal;
    setPassangers((passangers) => {
      return passangers.map((passanger) => {
        if (passanger.id === selectedPassanger) {
          return {
            ...passanger,
            meals: [
              ...passanger.meals,
              {
                ...mealWithoutDrinks,
                selectedDrink,
              },
            ],
          };
        }
        return passanger;
      });
    });
  }

  return (
    <article className="bg-white rounded-lg shadow-md drop-shadow-md p-6 w-full flex flex-row items-start max-w-screen-md border border-gray-500">
      <div className="mr-6">
        <img
          src={meal.img}
          alt={meal.title}
          className="w-48 h-48 object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 flex justify-between flex-col h-full">
        <header>
          <h2 className="text-xl font-semibold">{meal.title}</h2>
        </header>

        <section>
          <h3 className="text-lg font-medium mb-1">Details</h3>
          <div className="flex items-center text-gray-700">
            <span className="mr-2 font-medium">Starter:</span> {meal.starter}
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2 font-medium">Desert:</span> {meal.desert}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-1">Drinks</h3>
          <select
            className="list-disc list-inside"
            onChange={(e) => {
              setSelectedDrink(
                meal.drinks.find((d) => d.id === e.target.value)
              );
            }}
          >
            <option value={"none"}>Select a optional drink</option>
            {meal.drinks.map((drink) => {
              return (
                <option
                  key={drink.id}
                  className="text-gray-700"
                  value={drink.id}
                >
                  {drink.title} - {drink.price.toFixed(2)} €
                </option>
              );
            })}
          </select>
        </section>
      </div>
      <footer className="flex flex-col justify-between items-center h-full">
        <span className="text-xl font-semibold">{meal.price.toFixed(2)} €</span>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg"
          onClick={handleMealSelected}
        >
          Select
        </button>
      </footer>
    </article>
  );
}

export default MealCard;
