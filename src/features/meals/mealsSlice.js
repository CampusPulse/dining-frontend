import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL_MEALS = 'https://apiservicelocators.fdmealplanner.com/api/v1/data-locator-webapi/20/meals';

// Thunk to fetch meals based on meal period and location
export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async ({ locationId, mealPeriodId }) => {
	// create object representing query parameters
	
	const queryParams = new URLSearchParams({
        locationId,
        mealPeriodId,
		menuId: 0,
		accountId: 1,
		tenantId: 20,
		monthId: 10,
		fromDate: "2024/10/01",
		endDate: "2024/10/31",
		timeOffset: 0,
    });

    const response = await fetch(`${API_URL_MEALS}?${queryParams.toString()}`);
    const data = await response.json();
    return data["result"];
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
