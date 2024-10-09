import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace with the actual API URL for FDMealPlanner
const API_URL = 'https://api.fdmealplanner.com/locations';

// Thunk to fetch locations
export const fetchLocations = createAsyncThunk('locations/fetchLocations', async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default locationsSlice.reducer;
