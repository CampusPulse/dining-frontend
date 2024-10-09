import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, setSelectedLocation } from '../features/locations/locationsSlice';
import './LocationsList.css'; // Import the CSS

const LocationsList = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const selectedLocation = useSelector((state) => state.locations.selectedLocation);
  const status = useSelector((state) => state.locations.status);
  const error = useSelector((state) => state.locations.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocations());
    }
  }, [status, dispatch]);

  const handleSelectLocation = (location) => {
    dispatch(setSelectedLocation(location));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Select a Location</h2>
      <div className="locations-container">
        {locations.map((location) => (
          <button
            key={location.locationId}
            onClick={() => handleSelectLocation(location)}
            className={`location-button ${selectedLocation?.locationId === location.locationId ? 'selected' : ''}`}
          >
            {location.locationName}
          </button>
        ))}
      </div>

      {selectedLocation && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Location:</h3>
          <p>Name: {selectedLocation.locationName}</p>
        </div>
      )}
    </div>
  );
};

export default LocationsList;
