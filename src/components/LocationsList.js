import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, setSelectedLocation } from '../features/locations/locationsSlice';

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
      <ul>
        {locations.map((location) => (
          <li key={location.locationId} onClick={() => handleSelectLocation(location)}>
            {location.locationName}
          </li>
        ))}
      </ul>
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
