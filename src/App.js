import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import SongForm from "./SongForm";


import MapWithAutocomplete from "./MapWithAutocomplete";

function App() {
  const [token, setToken] = useState("");
  const [googleToken, setGoogleToken] = useState("");
  const [selectedSongDuration, setSelectedSongDuration] = useState(0);
  const [selectedSongName, setSelectedSongName] = useState('');
  const [timeInMs, setTimeInMs] = useState(null);
  
  
  function Home() {const {isLoaded} = useLoadScript({
    googleMapsApiKey: googleToken
  });
    if (!isLoaded) return <div>is Loading</div>
    return <Map />
};

  function Map() {
    <GoogleMap
    zoom={10} 
    center={{ lat: 44, lng: -80}}
    mapContainerClassName="map-container"
   > </GoogleMap>
  }

  const handleSongSelect = (durationMs) => {
    setSelectedSongDuration(durationMs);
  };

  const handleSongNameSelect = (songName) => {
    setSelectedSongName(songName);
  };

  const fetchSpotifyToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/spotifykey");

      if (response.ok) {
        const data = await response.text();
        setToken(data); // Display the retrieved string
      } else {
        throw new Error("Error:1 " + response.status);
      }
    } catch (error) {
      console.error("Error:2", error);
    }
  };

  const fetchGoogleToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/googlekey");

      if (response.ok) {
        const data = await response.text();
        setGoogleToken(data); // Display the retrieved string
      } else {
        throw new Error("Error:1 " + response.status);
      }
    } catch (error) {
      console.error("Error:2", error);
    }
  };

  useEffect(() => {
    fetchSpotifyToken();
    fetchGoogleToken();
  }, []);



  const handleTimeCalculated = (time) => {
    setTimeInMs(time);
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  console.log(token);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Distance in Song</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="custom-spotify">
              <Card.Body>
                <Card.Title>Spotify Side</Card.Title>

                <SongForm 
                  accessToken={token} 
                  onSongSelect={handleSongSelect}  
                  onSongNameSelect={handleSongNameSelect}
                />
                <p>Selected Song Duration: {selectedSongDuration} ms</p>
                <p>Selected Song Name: {selectedSongName}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="custom-google">
              <Card.Body>
                <Card.Title>Google Side</Card.Title>
                <Map />
                <MapWithAutocomplete
        origin="Origin Address"
        destination="Destination Address"
        onTimeCalculated={handleTimeCalculated}
        googleMapsApiKey={googleToken}
      />
      {/* {timeInMs !== null && <p>Time to travel: {timeInMs} ms</p>} */}
      <p>Time to travel: {timeInMs} ms</p>
    
               <Home />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
