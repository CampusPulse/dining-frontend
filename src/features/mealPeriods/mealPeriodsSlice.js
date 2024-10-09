import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL_MEAL_PERIODS = 'https://api.fdmealplanner.com/meal-periods';

// Thunk to fetch meal periods based on location
export const fetchMealPeriods = createAsyncThunk(
  'mealPeriods/fetchMealPeriods',
  async (locationId) => {
    const response = await fetch(`${API_URL_MEAL_PERIODS}?locationId=${locationId}`);
    const data = await response.json();
    return data;
  }
);

const mealPeriodsSlice = createSlice({
  name: 'mealPeriods',
  initialState: {
    mealPeriods: [],
    status: 'idle',
    error: null,
    selectedMealPeriod: null,
  },
  reducers: {
    setSelectedMealPeriod(state, action) {
      state.selectedMealPeriod = action.payload;
    },
    clearMealPeriods(state) {
      state.mealPeriods = [];
      state.selectedMealPeriod = null;
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

export const { setSelectedMealPeriod, clearMealPeriods } = mealPeriodsSlice.actions;
export default mealPeriodsSlice.reducer;
