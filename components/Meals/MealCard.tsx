import { Drink, Meal } from "@prisma/client";

function MealCard({ meal }: { meal: Meal & { drinks: Drink[] } }) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 w-full flex items-start max-w-screen-md">
      <div className="mr-6">
        <img
          src={meal.img}
          alt={meal.title}
          className="w-48 h-48 object-cover rounded-lg mb-4"
        />
      </div>

      <div className="flex-1">
        <header className="mb-4">
          <h2 className="text-xl font-semibold">{meal.title}</h2>
        </header>

        <section className="mb-2">
          <h3 className="text-lg font-medium mb-1">Details</h3>
          <div className="flex items-center text-gray-700">
            <span className="mr-2 font-medium">Starter:</span> {meal.starter}
          </div>
          <div className="flex items-center text-gray-700">
            <span className="mr-2 font-medium">Desert:</span> {meal.desert}
          </div>
        </section>

        <section className="mb-4">
          <h3 className="text-lg font-medium mb-1">Drinks</h3>
          <ul className="list-disc list-inside">
            {meal.drinks.map((drink) => {
              return (
                <li key={drink.id} className="text-gray-700">
                  {drink.title} - {drink.price.toFixed(2)} €
                </li>
              );
            })}
          </ul>
        </section>

        <footer className="flex items-center justify-between mt-auto">
          <span className="text-xl font-semibold">
            {meal.price.toFixed(2)} €
          </span>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium  px-5 py-2 rounded-lg">
            Select
          </button>
        </footer>
      </div>
    </article>
  );
}

export default MealCard;
