import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealPeriods, setSelectedMealPeriod } from '../features/mealPeriods/mealPeriodsSlice';

const MealPeriodsList = () => {
  const dispatch = useDispatch();
  const mealPeriods = useSelector((state) => state.mealPeriods.mealPeriods);
  const selectedMealPeriod = useSelector((state) => state.mealPeriods.selectedMealPeriod);
  const status = useSelector((state) => state.mealPeriods.status);
  const error = useSelector((state) => state.mealPeriods.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMealPeriods());
    }
  }, [status, dispatch]);

  const handleSelectMealPeriod = (mealPeriod) => {
    dispatch(setSelectedMealPeriod(mealPeriod));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Select a Meal Period</h2>
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

      {selectedMealPeriod && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Meal Period:</h3>
          <p>{selectedMealPeriod.name}</p>
        </div>
      )}
    </div>
  );
};

export default MealPeriodsList;
