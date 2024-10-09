import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeals, setSelectedMeal, clearMeals } from '../features/meals/mealsSlice';

const MealsList = ({ selectedLocation, selectedMealPeriod }) => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals.meals);
  const selectedMeal = useSelector((state) => state.meals.selectedMeal);
  const status = useSelector((state) => state.meals.status);
  const error = useSelector((state) => state.meals.error);

  useEffect(() => {
    if (selectedLocation && selectedMealPeriod) {
      dispatch(fetchMeals({ locationId: selectedLocation.id, mealPeriodId: selectedMealPeriod.id }));
      dispatch(clearMeals()); // Clear meals when new meal period is selected
    }
  }, [selectedLocation, selectedMealPeriod, dispatch]);

  const handleSelectMeal = (meal) => {
    dispatch(setSelectedMeal(meal));
  };

  if (status === 'loading') {
    return <div>Loading meals...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Select a Meal</h2>
      {selectedMealPeriod && (
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
      )}
    </div>
  );
};

export default MealsList;
