import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace with the actual API URL for FDMealPlanner
const API_URL = 'https://locations.fdmealplanner.com/api/v1/location-data-webapi/search-locationByAccount?AccountShortName=RIT&isActive=1&IsPlannerLocation=1&pageIndex=1&pageSize=0';

// Thunk to fetch locations
export const fetchLocations = createAsyncThunk('locations/fetchLocations', async () => {
  const headers = {
		'accept': 'application/json',
		'pragma': 'no-cache',
		'x-jsonresponsecase': 'camel',
		'x-requested-with': 'XMLHttpRequest',
		'user-agent': 'okhttp/4.9.1'
  }
  const response = await fetch(API_URL, {headers: headers} );
  const data = await response.json();
  return data["data"]["result"];
});

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [],
    status: 'idle',
    error: null,
    selectedLocation: null,  // Added selectedLocation
  },
  reducers: {
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    }
  },
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

export const { setSelectedLocation } = locationsSlice.actions; // Export action
export default locationsSlice.reducer;
