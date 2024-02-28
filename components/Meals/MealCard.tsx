import { Drink, Meal } from "@prisma/client";

function MealCard({ meal }: { meal: Meal & { drinks: Drink[] } }) {
  return (
    <div>
      <p>{meal.title}</p>
      <p>{meal.starter}</p>
      <p>{meal.desert}</p>
      <img src={meal.img} />
      <p>{meal.price.toFixed(2)}</p>
      <div>
        {meal.drinks.map((drink) => {
          return (
            <div key={drink.id}>
              <p>{drink.price.toFixed(2)}</p>
              <p>{drink.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MealCard;
