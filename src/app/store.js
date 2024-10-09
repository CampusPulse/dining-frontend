import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '../features/locations/locationsSlice';
import mealPeriodsReducer from '../features/mealPeriods/mealPeriodsSlice';
import mealsReducer from '../features/meals/mealsSlice'; // Import meals reducer

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    mealPeriods: mealPeriodsReducer,
    meals: mealsReducer,
  }
});
