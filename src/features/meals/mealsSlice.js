import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace with the actual API URL for meals
const API_URL_MEALS = 'https://api.fdmealplanner.com/meals';

// Thunk to fetch meals
export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
  const response = await fetch(API_URL_MEALS);
  const data = await response.json();
  return data;
});

const mealsSlice = createSlice({
  name: 'meals',
  initialState: {
    meals: [],
    status: 'idle',
    error: null,
    selectedMeal: null, // Added selectedMeal
  },
  reducers: {
    setSelectedMeal(state, action) {
      state.selectedMeal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSelectedMeal } = mealsSlice.actions; // Export action
export default mealsSlice.reducer;
