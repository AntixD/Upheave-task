"use server";

import type { Drink, Meal, User } from "@prisma/client";

import prisma from "@/server/db";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { formData } from "@/types";

export async function getMeals() {
  const meals = await prisma.meal.findMany({
    include: { drinks: true, labels: true },
  });
  return meals;
}

export async function getMeal() {
  const meals = await prisma.meal.findMany();
  return meals;
}

export async function getLabels() {
  const Label = await prisma.label.findMany();
  return Label;
}

export async function createMeal(mealData: formData) {
  const meal = await prisma.meal.create({
    data: {
      title: mealData.title,
      starter: mealData.starter,
      desert: mealData.desert,
      price: parseFloat(mealData.price),
      img: mealData.img,
    },
  });

  return { ...meal, price: meal.price.toFixed(2) };
}

export async function updateMeal(mealData: formData) {
  return await prisma.meal.update({
    where: { id: mealData.id },
    data: { ...mealData, price: parseFloat(mealData.price) },
  });
}

export async function deleteMeal(mealId: string) {
  return await prisma.meal.delete({ where: { id: mealId } });
}

export async function registerUser(formData: FormData): Promise<User | null> {
  const username = formData.get("username") as string;
  const plaintextPassword = formData.get("password") as string;

  if (!username || !plaintextPassword) return null;

  if (await prisma.user.findFirst({ where: { username } })) return null;

  const password = bcrypt.hashSync(plaintextPassword, 12);

  await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  redirect("/auth/login");
}
