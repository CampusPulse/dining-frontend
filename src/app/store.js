import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '../features/locations/locationsSlice';
import mealPeriodsReducer from '../features/mealPeriods/mealPeriodsSlice';
export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    mealPeriods: mealPeriodsReducer,
  }
});
