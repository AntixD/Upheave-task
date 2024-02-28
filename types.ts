import { Drink, Label, Meal } from "@prisma/client";

export type MealWithDrinks = Meal & { drinks: Drink[] };
export type MealDrinkLabel = Meal & { drinks: Drink[]; labels: Label[] };
