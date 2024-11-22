import React, { useState } from 'react';
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
  onQuantityChange
}) => {
  // Trie les aliments par ordre alphabétique
  const sortedFoodData = foodData.sort((a, b) => a.name.localeCompare(b.name));

  // Formatage des aliments pour React Select
  const foodOptions = sortedFoodData.map(food => ({
    value: food.name,
    label: food.name
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

  const handleSelectFood = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption === null) {
      onFoodChange(id, null);
      return;
    }
    const selectedFood = sortedFoodData.find(food => food.name === selectedOption.value);
    onFoodChange(id, selectedFood || null);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    if (value < 1) value = 1; // Limiter à 1g minimum
    if (value > 5000) value = 5000; // Limiter à 5000g maximum
    onQuantityChange(id, value);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQuantityChange(id, Number(event.target.value));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{food ? food.name : 'Sélectionner un aliment'}</h3>
        <button onClick={() => onRemove(id)} className="text-red-500 hover:text-red-700">
          Supprimer
        </button>
      </div>
      <Select
        options={foodOptions}
        onChange={handleSelectFood}
        placeholder="Rechercher un aliment..."
        isClearable
        isSearchable
      />
      
      {food && (
        <div className="mt-6">
          <label>Quantité (g) :</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="5000"
              value={quantity}
              onChange={handleSliderChange}
              className="w-full"
            />
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 p-2 border rounded"
              min="1"
              max="5000"
            />
            <span>g</span>
          </div>

          <div className="mt-4">
            <p>Protéines: {calculateNutrition(food, quantity).protein}g</p>
            <p>Glucides: {calculateNutrition(food, quantity).carbohydrates}g</p>
            <p>Gras: {calculateNutrition(food, quantity).fat}g</p>
            <p>Gras saturés: {calculateNutrition(food, quantity).saturatedFat}g</p>
            <p>Calories: {calculateNutrition(food, quantity).calories} kcal</p>
            <p>Fibres: {calculateNutrition(food, quantity).fiber}g</p>
            <p>Sucre: {calculateNutrition(food, quantity).sugar}g</p>
            <p>Sel: {calculateNutrition(food, quantity).salt}g</p>
          </div>
        </div>
      )}
    </div>
  );
};

const FoodSelectionForm: React.FC = () => {
  const [foods, setFoods] = useState<
    Array<{ id: number; food: Food | null; quantity: number }>
  >([{ id: 1, food: null, quantity: 0 }]);

  const [totalNutrition, setTotalNutrition] = useState({
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    saturatedFat: 0,
    calories: 0,
    fiber: 0,
    sugar: 0,
    salt: 0
  });

  const addFoodSelector = () => {
    setFoods([...foods, { id: foods.length + 1, food: null, quantity: 0 }]);
  };

  const removeFoodSelector = (id: number) => {
    const updatedFoods = foods.filter(food => food.id !== id);
    setFoods(updatedFoods);
    calculateTotalNutrition(updatedFoods);
  };
  

  const handleFoodChange = (id: number, food: Food | null) => {
    const updatedFoods = foods.map(f =>
      f.id === id ? { ...f, food } : f
    );
    setFoods(updatedFoods);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedFoods = foods.map(f =>
      f.id === id ? { ...f, quantity } : f
    );
    setFoods(updatedFoods);
    calculateTotalNutrition(updatedFoods);
  };

  const calculateTotalNutrition = (foods: Array<{ id: number; food: Food | null; quantity: number }>) => {
    let total = {
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      saturatedFat: 0,
      calories: 0,
      fiber: 0,
      sugar: 0,
      salt: 0
    };

    foods.forEach(f => {
      if (f.food) {
        const nutrition = calculateNutrition(f.food, f.quantity);
        total.protein += parseFloat(nutrition.protein);
        total.carbohydrates += parseFloat(nutrition.carbohydrates);
        total.fat += parseFloat(nutrition.fat);
        total.saturatedFat += parseFloat(nutrition.saturatedFat);
        total.calories += parseFloat(nutrition.calories);
        total.fiber += parseFloat(nutrition.fiber);
        total.sugar += parseFloat(nutrition.sugar);
        total.salt += parseFloat(nutrition.salt);
      }
    });

    setTotalNutrition(total);
  };

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sélectionner des aliments</h2>
      {foods.map(food => (
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
      <button
        onClick={addFoodSelector}
        className="mt-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Ajouter un aliment
      </button>

      {/* Total des nutriments */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Total des nutriments</h3>
        <p>Protéines: {totalNutrition.protein.toFixed(2)}g</p>
        <p>Glucides: {totalNutrition.carbohydrates.toFixed(2)}g</p>
        <p>Gras: {totalNutrition.fat.toFixed(2)}g</p>
        <p>Gras saturés: {totalNutrition.saturatedFat.toFixed(2)}g</p>
        <p>Calories: {totalNutrition.calories.toFixed(2)} kcal</p>
        <p>Fibres: {totalNutrition.fiber.toFixed(2)}g</p>
        <p>Sucre: {totalNutrition.sugar.toFixed(2)}g</p>
        <p>Sel: {totalNutrition.salt.toFixed(2)}g</p>
      </div>
    </div>
  );
};

export default FoodSelectionForm;
