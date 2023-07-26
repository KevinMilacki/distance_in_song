import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { LoadScript, Autocomplete, useLoadScript} from '@react-google-maps/api';
import axios from 'axios';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key
const backendBaseUrl = 'http://localhost:3001'; // Replace with your backend API URL
const lib = '[places]'

const MapWithAutocomplete = ({ onTimeCalculated, googleMapsApiKey }) => {
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');

  const handlePlaceChanged = async () => {
    try {
      // Fetch lat/lng from the backend API for origin and destination
      const originLatLngResponse = await axios.get(`${backendBaseUrl}/api/latlng`, {
        params: {
          address: originAddress,
        },
      });

      const destinationLatLngResponse = await axios.get(`${backendBaseUrl}/api/latlng`, {
        params: {
          address: destinationAddress,
        },
      });

      const originLatLng = originLatLngResponse.data.latlng;
      const destinationLatLng = destinationLatLngResponse.data.latlng;

      // Make the backend API call to get the time duration
      const response = await axios.get(`${backendBaseUrl}/api/distance`, {
        params: {
          originLat: originLatLng.lat,
          originLng: originLatLng.lng,
          destinationLat: destinationLatLng.lat,
          destinationLng: destinationLatLng.lng,
        },
      });

      const data = response.data;

      if (data && data.status === 'OK' && data.rows.length > 0) {
        const { elements } = data.rows[0];
        if (elements.length > 0 && elements[0].status === 'OK') {
          const durationInMs = elements[0].duration.value * 1000;
          onTimeCalculated(durationInMs); // Output the time to App.js
        } else {
          console.log('No data available for the given route.');
        }
      } else {
        console.log('Error fetching data from the Google Maps API.');
      }
    } catch (error) {
      console.error('Error fetching data from the backend API:', error);
    }
  };


  const handleError = (error) => {
    console.log('Error in API: ', error);
  };

  const handleLoad = (map, google) => {
    console.log('Google Maps API loaded successfully.');
    // You can use the 'map' and 'google' objects here
  };

  const libraries = ['places'];

  // Load the Google Maps API and the Places API using the useLoadScript hook
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
                 <Form.Group controlId="originAddress" >
            <Form.Label>Origin Address</Form.Label>
            <Autocomplete
              onLoad={(autocomplete) => (autocomplete.addListener('place_changed', () => setOriginAddress(autocomplete.getPlace().formatted_address)))}
            >
              <input
                type="text"
                value={originAddress}
                onChange={(e) => setOriginAddress(e.target.value)}
                placeholder="Enter origin address"
                className='custom-input'
              />
            </Autocomplete>
          </Form.Group>
       
     
          <Form.Group controlId="destinationAddress">
            <Form.Label>Destination Address</Form.Label>
            <Autocomplete
              onLoad={(autocomplete) => (autocomplete.addListener('place_changed', () => setDestinationAddress(autocomplete.getPlace().formatted_address)))}
            >
              <input
                type="text"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder="Enter destination address"
                className='custom-input mb-3'  
              />
            </Autocomplete>
          </Form.Group>
       
      </Row>
      <Button onClick={handlePlaceChanged}>Calculate Time</Button>
    </>
  );
};


export default MapWithAutocomplete;

