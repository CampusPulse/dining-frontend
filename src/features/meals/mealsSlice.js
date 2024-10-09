import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL_MEALS = 'https://api.fdmealplanner.com/meals';

// Thunk to fetch meals based on meal period and location
export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async ({ locationId, mealPeriodId }) => {
    const response = await fetch(`${API_URL_MEALS}?locationId=${locationId}&mealPeriodId=${mealPeriodId}`);
    const data = await response.json();
    return data;
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState: {
    meals: [],
    status: 'idle',
    error: null,
    selectedMeal: null,
  },
  reducers: {
    setSelectedMeal(state, action) {
      state.selectedMeal = action.payload;
    },
    clearMeals(state) {
      state.meals = [];
      state.selectedMeal = null;
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

export const { setSelectedMeal, clearMeals } = mealsSlice.actions;
export default mealsSlice.reducer;
