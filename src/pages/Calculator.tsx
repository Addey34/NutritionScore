import { useState } from 'react';
import FoodSelector from '../components/FoodSelector';
import Layout from '../components/Layout';

interface Food {
  id: number;
  food: any;
  quantity: number;
}

interface Nutrition {
  protein: number;
  carbohydrates: number;
  fat: number;
  saturatedFat: number;
  calories: number;
  fiber: number;
  sugar: number;
  salt: number;
}

export const Calculator = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  // Function to add a food selector
  const addFoodSelector = () => {
    setFoods((prevFoods) => [
      ...prevFoods,
      { id: prevFoods.length + 1, food: null, quantity: 0 },
    ]);
  };

  // Function to remove a food selector
  const removeFoodSelector = (id: number) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
  };

  // Function to handle food change
  const handleFoodChange = (id: number, food: any | null) => {
    const updatedFoods = foods.map((f) => (f.id === id ? { ...f, food } : f));
    setFoods(updatedFoods);
  };

  // Function to handle quantity change
  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedFoods = foods.map((f) =>
      f.id === id ? { ...f, quantity } : f
    );
    setFoods(updatedFoods);
  };

  // Function to calculate total nutrition across all foods
  const calculateTotalNutrition = () => {
    const total: Nutrition = {
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      saturatedFat: 0,
      calories: 0,
      fiber: 0,
      sugar: 0,
      salt: 0,
    };

    foods.forEach((f) => {
      if (f.food) {
        const nutrition = calculateNutrition(f.food, f.quantity);
        total.protein += nutrition.protein;
        total.carbohydrates += nutrition.carbohydrates;
        total.fat += nutrition.fat;
        total.saturatedFat += nutrition.saturatedFat;
        total.calories += nutrition.calories;
        total.fiber += nutrition.fiber;
        total.sugar += nutrition.sugar;
        total.salt += nutrition.salt;
      }
    });

    return total;
  };

  // Function to calculate the nutrition for a single food item
  const calculateNutrition = (food: any, quantity: number): Nutrition => {
    const factor = quantity / 100; // Nutrient values are based on 100g
    return {
      protein: food.protein * factor,
      carbohydrates: food.carbohydrates * factor,
      fat: food.fat * factor,
      saturatedFat: food.saturatedFat * factor,
      calories: food.calories * factor,
      fiber: food.fiber * factor,
      sugar: food.sugar * factor,
      salt: food.salt * factor,
    };
  };

  // Calculate the total nutrition after each render
  const totalNutrition = calculateTotalNutrition();

  return (
    <Layout>
      <div className="w-full max-w-4xl bg-gray-700 pt-4 px-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold pb-4 text-white text-center">
          Calculator
        </h1>

        {/* Display the list of food selectors */}
        {foods.map((food) => (
          <FoodSelector
            key={food.id}
            id={food.id}
            food={food.food}
            quantity={food.quantity}
            onRemove={removeFoodSelector}
            onFoodChange={handleFoodChange}
            onQuantityChange={handleQuantityChange}
          />
        ))}

        {/* Add food button */}
        <div className="flex justify-center">
          <button
            onClick={addFoodSelector}
            className="px-4 py-2 mt-2 bg-green-500 text-white rounded-md"
          >
            Add Food
          </button>
        </div>

        {/* Display the total nutrition */}
        <div className="flex justify-center mt-4 text-white">
          <div>
            <h2 className="font-bold text-center text-2xl">Total Nutrition</h2>
            <div className="flex justify-center items-center mt-4 text-white">
              <div>
                <p>
                  Protéines :{' '}
                  <span className="text-green-500">
                    {totalNutrition.protein.toFixed(2)}g
                  </span>
                </p>
                <p>
                  Glucides :{' '}
                  <span className="text-green-500">
                    {totalNutrition.carbohydrates.toFixed(2)}g
                  </span>
                </p>
                <p>
                  Gras :{' '}
                  <span className="text-green-500">
                    {totalNutrition.fat.toFixed(2)}g
                  </span>
                </p>
                <p>
                  Gras saturés :{' '}
                  <span className="text-green-500">
                    {totalNutrition.saturatedFat.toFixed(2)}g
                  </span>
                </p>
                <p>
                  Calories :{' '}
                  <span className="text-green-500">
                    {totalNutrition.calories.toFixed(2)} kcal
                  </span>
                </p>
                <p>
                  Fibres :{' '}
                  <span className="text-green-500">
                    {totalNutrition.fiber.toFixed(2)}g
                  </span>
                </p>
                <p>
                  Sucre :{' '}
                  <span className="text-green-500">
                    {totalNutrition.sugar.toFixed(2)}g
                  </span>
                </p>
                <p>
                  Sel :{' '}
                  <span className="text-green-500">
                    {totalNutrition.salt.toFixed(2)}g
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
