"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { createMeal, updateMeal, deleteMeal } from "@/lib/api";
import { Meal } from "@prisma/client";

function MealAdmin({ meals: mealData }: { meals: Meal[] }) {
  const [editingMeal, setEditingMeal] = useState<typeof formData | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    starter: "",
    desert: "",
    price: "",
    img: "",
  });

  const [meals, setMeals] = useState([...mealData].map( meal => {
    return {
      ...meal,
      price: (meal.price.toFixed(2))
    }
  }));

  const handleEdit = (meal: typeof formData) => {
    setEditingMeal(meal);
    setFormData({ ...meal });
  };

  const handleDelete = async (mealId: string) => {
    if (confirm(`Are you sure you want to delete this meal?`)) {
      try {
        await deleteMeal(mealId);
        setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
      } catch (error) {
        console.error("Error deleting meal:", error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const priceFloat = formData.price;
      const mealData = { ...formData, price: priceFloat };

      if (editingMeal) {
        await updateMeal(mealData);
        const updatedMeals = meals.map((meal) =>
          meal.id === editingMeal.id ? { ...meal, ...mealData } : meal
        );
        setMeals(updatedMeals);
      } else {
        const newMeal = await createMeal(mealData);
        setMeals([...meals, newMeal]);
      }
      setEditingMeal(null);
      setFormData({
        id: "",
        title: "",
        starter: "",
        desert: "",
        price: "",
        img: "",
      });
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Meal Management</h1>
      <ul>
        {meals.map((meal) => (
          <li
            key={meal.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div>
              <span className="text-xl font-semibold">{meal.title}</span> -{" "}
              {meal.price}
            </div>
            <div>
              <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => handleEdit(meal)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(meal.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-4">
        {editingMeal ? "Editing Meal" : "Add New Meal"}
      </h2>
      <form onSubmit={async (e) => handleSubmit(e)} className="w-full max-w-lg">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
        />
        <input
          type="text"
          placeholder="Starter"
          name="starter"
          value={formData.starter}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
        />
        <input
          type="text"
          placeholder="Dessert"
          name="desert"
          value={formData.desert}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
        />
        <input
          type="text"
          placeholder="Image URL"
          name="img"
          value={formData.img}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default MealAdmin;
