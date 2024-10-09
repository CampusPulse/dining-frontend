import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '../features/locations/locationsSlice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer
  }
});
