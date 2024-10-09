import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../features/locations/locationsSlice';

const LocationsList = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const status = useSelector((state) => state.locations.status);
  const error = useSelector((state) => state.locations.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLocations());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map((location) => (
          <li key={location.locationId}>
            {location.locationName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsList;
