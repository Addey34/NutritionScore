import React from 'react';
import Select, { SingleValue } from 'react-select';
import { foodData } from '../data/foodData';

interface Food {
  name: string;
  protein: number;
  carbohydrates: number;
  fat: number;
  saturatedFat: number;
  calories: number;
  fiber: number;
  sugar: number;
  salt: number;
}

interface FoodSelectorProps {
  id: number;
  food: Food | null;
  quantity: number;
  onRemove: (id: number) => void;
  onFoodChange: (id: number, food: Food | null) => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({
  id,
  food,
  quantity,
  onRemove,
  onFoodChange,
  onQuantityChange,
}) => {
  // Trie les aliments par ordre alphabétique
  const sortedFoodData = foodData.sort((a, b) => a.name.localeCompare(b.name));

  // Formatage des aliments pour React Select
  const foodOptions = sortedFoodData.map((food) => ({
    value: food.name,
    label: food.name,
  }));

  // Fonction pour calculer les valeurs nutritionnelles en fonction de la quantité
  const calculateNutrition = (food: Food, quantity: number) => ({
    protein: ((food.protein * quantity) / 100).toFixed(2),
    carbohydrates: ((food.carbohydrates * quantity) / 100).toFixed(2),
    fat: ((food.fat * quantity) / 100).toFixed(2),
    saturatedFat: ((food.saturatedFat * quantity) / 100).toFixed(2),
    calories: ((food.calories * quantity) / 100).toFixed(2),
    fiber: ((food.fiber * quantity) / 100).toFixed(2),
    sugar: ((food.sugar * quantity) / 100).toFixed(2),
    salt: ((food.salt * quantity) / 100).toFixed(2),
  });

  const handleSelectFood = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption === null) {
      onFoodChange(id, null);
      return;
    }
    const selectedFood = sortedFoodData.find(
      (food) => food.name === selectedOption.value
    );
    onFoodChange(id, selectedFood || null);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 0) value = 0;
    if (value > 5000) value = 5000;
    onQuantityChange(id, value);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {food ? food.name : 'Select food'}
        </h3>
        <button
          onClick={() => onRemove(id)}
          className="text-red-500 hover:text-red-700 font-bold"
        >
          Delete
        </button>
      </div>

      <Select
        options={foodOptions}
        onChange={handleSelectFood}
        placeholder="Search food..."
        isClearable
        isSearchable
        className="w-full mb-4"
      />

      {food && (
        <div className="mt-6">
          <label className="block mb-2 text-sm">Quantity (g):</label>
          <div className="flex flex-col md:flex-row items-center justify-between space-x-0 md:space-x-4">
            <input
              type="range"
              min="0"
              max="5000"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full mb-2 md:mb-0 md:w-4/5"
            />
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 p-2 border rounded-md"
                min="0"
                max="5000"
              />
              <span>g</span>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <p>Proteins: {calculateNutrition(food, quantity).protein}g</p>
            <p>
              Carbohydrates: {calculateNutrition(food, quantity).carbohydrates}g
            </p>
            <p>Fats: {calculateNutrition(food, quantity).fat}g</p>
            <p>
              Saturated Fat: {calculateNutrition(food, quantity).saturatedFat}g
            </p>
            <p>Calories: {calculateNutrition(food, quantity).calories} kcal</p>
            <p>Fiber: {calculateNutrition(food, quantity).fiber}g</p>
            <p>Sugar: {calculateNutrition(food, quantity).sugar}g</p>
            <p>Salt: {calculateNutrition(food, quantity).salt}g</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSelector;
