import React, { useState } from 'react';
import axios from 'axios';

const DistanceCalculator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');

  const handlePlaceSelect = async (address, isOrigin) => {
    try {
      const response = await axios.get('http:localhost:3001/places', {
        params: {
          query: address,
        },
      });

      const { results } = response.data;
      if (results.length > 0) {
        const selectedAddress = results[0].formatted_address;
        if (isOrigin) {
          setOrigin(selectedAddress);
        } else {
          setDestination(selectedAddress);
        }
      }
    } catch (error) {
      console.error('Error selecting place:', error);
    }
  };

  const handleCalculateDistance = async () => {
    try {
      const response = await axios.get('http:localhost:3001/distance-matrix', {
        params: {
          origins: origin,
          destinations: destination,
        },
      });

      const { duration } = response.data.rows[0].elements[0];
      setDuration(duration.text);
    } catch (error) {
      console.error('Error calculating distance:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Origin"
      />
      <button onClick={() => handlePlaceSelect(origin, true)}>Autocomplete Origin</button>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
      />
      <button onClick={() => handlePlaceSelect(destination, false)}>Autocomplete Destination</button>
      <button onClick={handleCalculateDistance}>Calculate Distance</button>
      {duration && <p>Duration: {duration}</p>}
    </div>
  );
};

export default DistanceCalculator;