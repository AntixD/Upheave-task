"use client";

import { passengersAtom } from "@/lib/state";
import { useAtom } from "jotai";

export default function Summary() {
  const [passangers] = useAtom(passengersAtom);

  function getSelectedPrice(passangerId: string) {
    const selectedMeals = passangers.find(
      (person) => person.id === passangerId
    )!.meals;
    return selectedMeals.reduce(
      (acc, meal) => acc + meal.price + (meal.selectedDrink?.price ?? 0),
      0
    );
  }

  const totalPrice = () =>
    passangers
      .map((p) =>
        p.meals.reduce(
          (acc, meal) => acc + meal.price + (meal.selectedDrink?.price ?? 0),
          0
        )
      )
      .reduce((acc, price) => acc + price, 0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
        {passangers.map((person) => (
          <div
            key={person.id}
            className="bg-white p-6 rounded-lg shadow-md mb-5"
          >
            <h2 className="text-xl font-semibold mb-3">
              Passenger {person.id}
            </h2>
            <ul className="list-disc list-inside">
              {person.meals.map((meal) => (
                <li key={meal.id} className="mb-2">
                  {meal.title} - {meal.price} €
                  {meal.selectedDrink && (
                    <span className="text-gray-600 ml-2">
                      (with {meal.selectedDrink.title} -{" "}
                      {meal.selectedDrink.price} €)
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="font-medium text-lg mt-3">
              Passenger Total: {getSelectedPrice(person.id).toFixed(2)} €
            </p>
          </div>
        ))}
      </div>
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold">
          Grand Total: {totalPrice().toFixed(2)} €
        </h2>
      </div>
    </main>
  );
}
