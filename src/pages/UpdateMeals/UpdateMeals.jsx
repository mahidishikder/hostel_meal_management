import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useMealsCard from '../../hooks/useMealsCard';

const MealsEdit = () => {
  const [mealsCard, refetch] = useMealsCard();

  const { id } = useParams();
  const navigate = useNavigate();
  const [mealData, setMealData] = useState(null);
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const selectedMeal = mealsCard.find(meal => meal._id === id);
    if (selectedMeal) {
      setMealData(selectedMeal);
      setIngredients(selectedMeal.ingredients || []);
    }
  }, [mealsCard, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  const handleIngredientAdd = () => {
    if (ingredientInput.trim() !== '') {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const handleIngredientRemove = (index) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMeal = {
      ...mealData,
      price: parseFloat(mealData.price),
      rating: parseFloat(mealData.rating),
      calories: parseInt(mealData.calories),
      ingredients,
    };

    fetch(`http://localhost:3000/meals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMeal),
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: 'Success!',
          text: 'Meal updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        refetch(); // reload meals
        navigate('/dashboard/manageMeals');
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update meal',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });
  };

  if (!mealData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-orange-200">
      <h2 className="text-3xl font-bold text-[#FF6900] mb-6 text-center">Edit Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Meal Title" onChange={handleChange} value={mealData.title} className="w-full border border-orange-300 p-3 rounded" required />
        <select name="category" onChange={handleChange} value={mealData.category} className="w-full border border-orange-300 p-3 rounded" required>
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} value={mealData.image} className="w-full border border-orange-300 p-3 rounded" required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} value={mealData.price} className="w-full border border-orange-300 p-3 rounded" required />
        <input type="number" name="rating" placeholder="Rating" onChange={handleChange} value={mealData.rating} className="w-full border border-orange-300 p-3 rounded" step="0.1" min="0" max="5" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} value={mealData.description} className="w-full border border-orange-300 p-3 rounded" required />
        <input type="number" name="calories" placeholder="Calories" onChange={handleChange} value={mealData.calories} className="w-full border border-orange-300 p-3 rounded" required />
        <input type="text" name="distributorName" placeholder="Distributor Name" onChange={handleChange} value={mealData.distributorName} className="w-full border border-orange-300 p-3 rounded" required />

        <div>
          <label className="block font-semibold mb-1 text-[#FF6900]">Ingredients</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter ingredient"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="border border-orange-300 p-3 rounded w-full"
            />
            <button type="button" onClick={handleIngredientAdd} className="bg-[#FF6900] text-white px-4 py-2 rounded hover:opacity-90">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((item, index) => (
              <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {item}
                <button type="button" onClick={() => handleIngredientRemove(index)} className="text-red-500 hover:text-red-700 font-bold">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-[#FF6900] text-white font-semibold py-3 rounded hover:opacity-90 transition-all duration-300">
          Update Meal
        </button>
      </form>
    </div>
  );
};

export default MealsEdit;
