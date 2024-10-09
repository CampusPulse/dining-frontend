import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealPeriods, setSelectedMealPeriod, clearMealPeriods } from '../features/mealPeriods/mealPeriodsSlice';
import { clearMeals } from '../features/meals/mealsSlice';

const MealPeriodsList = ({ selectedLocation }) => {
  const dispatch = useDispatch();
  const mealPeriods = useSelector((state) => state.mealPeriods.mealPeriods);
  const selectedMealPeriod = useSelector((state) => state.mealPeriods.selectedMealPeriod);
  const status = useSelector((state) => state.mealPeriods.status);
  const error = useSelector((state) => state.mealPeriods.error);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchMealPeriods(selectedLocation.id));
      dispatch(clearMealPeriods()); // Clear meal periods if new location is selected
      dispatch(clearMeals()); // Clear meals when location changes
    }
  }, [selectedLocation, dispatch]);

  const handleSelectMealPeriod = (mealPeriod) => {
    dispatch(setSelectedMealPeriod(mealPeriod));
  };

  if (status === 'loading') {
    return <div>Loading meal periods...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Select a Meal Period</h2>
      {selectedLocation && (
        <div className="meal-periods-container">
          {mealPeriods.map((mealPeriod) => (
            <button
              key={mealPeriod.id}
              onClick={() => handleSelectMealPeriod(mealPeriod)}
              className={`meal-period-button ${selectedMealPeriod?.id === mealPeriod.id ? 'selected' : ''}`}
            >
              {mealPeriod.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealPeriodsList;
