import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './app/store';
import LocationsList from './components/LocationsList';
import MealPeriodsList from './components/MealPeriodsList';
import MealsList from './components/MealsList';
import './components/LocationsList.css';
import './components/MealPeriodsList.css';
import './components/MealsList.css';

const App = () => {
  const selectedLocation = useSelector((state) => state.locations.selectedLocation);
  const selectedMealPeriod = useSelector((state) => state.mealPeriods.selectedMealPeriod);

  return (
    <Provider store={store}>
      <div>
        <h1>FDMealPlanner</h1>
        <LocationsList />
        <MealPeriodsList selectedLocation={selectedLocation} />
        <MealsList selectedLocation={selectedLocation} selectedMealPeriod={selectedMealPeriod} />
      </div>
    </Provider>
  );
};

export default App;