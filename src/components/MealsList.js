import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeals, setSelectedMeal } from '../features/meals/mealsSlice';

const MealsList = () => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals.meals);
  const selectedMeal = useSelector((state) => state.meals.selectedMeal);
  const status = useSelector((state) => state.meals.status);
  const error = useSelector((state) => state.meals.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMeals());
    }
  }, [status, dispatch]);

  const handleSelectMeal = (meal) => {
    dispatch(setSelectedMeal(meal));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Select a Meal</h2>
      <div className="meals-container">
        {meals.map((meal) => (
          <button
            key={meal.id}
            onClick={() => handleSelectMeal(meal)}
            className={`meal-button ${selectedMeal?.id === meal.id ? 'selected' : ''}`}
          >
            {meal.name}
          </button>
        ))}
      </div>

      {selectedMeal && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Meal:</h3>
          <p>{selectedMeal.name}</p>
          <p>{selectedMeal.description}</p>
        </div>
      )}
    </div>
  );
};

export default MealsList;
