"use server";

import prisma from "@/server/db";

export async function getMeals() {
  const Meals = await prisma.meal.findMany();
  return Meals;
}

export async function getLabels() {
  const Label = await prisma.label.findMany();
  return Label;
}
