import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace with the actual API URL for meal periods
const API_URL_MEAL_PERIODS = 'https://api.fdmealplanner.com/meal-periods';

// Thunk to fetch meal periods
export const fetchMealPeriods = createAsyncThunk('mealPeriods/fetchMealPeriods', async () => {
  const response = await fetch(API_URL_MEAL_PERIODS);
  const data = await response.json();
  return data;
});

const mealPeriodsSlice = createSlice({
  name: 'mealPeriods',
  initialState: {
    mealPeriods: [],
    status: 'idle',
    error: null,
    selectedMealPeriod: null, // Added selectedMealPeriod
  },
  reducers: {
    setSelectedMealPeriod(state, action) {
      state.selectedMealPeriod = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealPeriods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMealPeriods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mealPeriods = action.payload;
      })
      .addCase(fetchMealPeriods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSelectedMealPeriod } = mealPeriodsSlice.actions; // Export action
export default mealPeriodsSlice.reducer;
