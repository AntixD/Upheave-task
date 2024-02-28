"use server";

import prisma from "@/server/db";

export async function getMeals() {
  const meals = await prisma.meal.findMany({
    include: { drinks: true, labels: true },
  });
  return meals;
}

export async function getLabels() {
  const Label = await prisma.label.findMany();
  return Label;
}
