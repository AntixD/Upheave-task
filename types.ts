import { Drink, Label, Meal } from "@prisma/client";

export type MealWithDrinks = Meal & { drinks: Drink[] };

export type MealDrinkLabel = Meal & { drinks: Drink[]; labels: Label[] };

export type Passenger = {
  id: string;
  meals: (Meal & {
    selectedDrink: Drink | undefined;
  })[];
};

export type formData = {
  id: string;
  title: string;
  starter: string;
  desert: string;
  price: string;
  img: string;
};
