"use client";

import { passengersAtom, selectedPassangerAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

function PassengerSelection() {
  const [passangers, setPassangers] = useAtom(passengersAtom);
  const router = useRouter();

  function handleSubmitOrder() {
    router.push("/summary");
  }

  const [selectedPassanger, setSelectedPassanger] = useAtom(
    selectedPassangerAtom
  );

  function handleRemoveMeal(passengerId: string, mealIndex: number) {
    setPassangers((passengers) => {
      return passengers.map((passenger) => {
        if (passenger.id === passengerId) {
          const updatedMeals = [...passenger.meals];
          updatedMeals.splice(mealIndex, 1);
          return {
            ...passenger,
            meals: updatedMeals,
          };
        }
        return passenger;
      });
    });
  }

  const selectedPassengerObj = passangers.find(
    (person) => person.id === selectedPassanger
  );

  function getSelectedMealsText(passangerId: string) {
    const selectedMeals = passangers.find(
      (person) => person.id === passangerId
    )!.meals;

    if (selectedMeals.length > 0) {
      return `${selectedMeals.length} meal${
        selectedMeals.length > 1 ? "s" : ""
      } selected.`;
    } else {
      return `No meals selected.`;
    }
  }

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
      .map((p) => getSelectedPrice(p.id))
      .reduce((acc, price) => acc + price, 0);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-4 w-72">
        {passangers.map((person) => (
          <button
            key={person.id}
            onClick={() => setSelectedPassanger(person.id)}
            className={twMerge(
              "flex-col gap-4 py-2 px-4 rounded-md border border-gray-400 focus:outline-none flex justify-between items-center",
              selectedPassanger === person.id && "bg-indigo-500/10"
            )}
          >
            <span>{person.id}</span>
            <span className="text-sm text-gray-500">{`${
              person.meals.length
            } meal${person.meals.length > 1 ? "s" : ""} selected`}</span>
          </button>
        ))}
      </div>
      {selectedPassengerObj && (
        <div className="flex flex-col gap-2">
          {selectedPassengerObj.meals.map((meal, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700">{meal.title}</span>
              <button
                onClick={() => handleRemoveMeal(selectedPassanger!, index)}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="text-xl flex justify-between items-center">
        <span className="text-gray-700">Total price:</span>
        <span className="font-semibold text-gray-700">
          {totalPrice().toFixed(2)} €
        </span>
      </div>
      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg"
        onClick={handleSubmitOrder}
      >
        Go to Summary
      </button>
    </div>
  );
}

export default PassengerSelection;
