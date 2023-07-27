import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card,  Button } from "react-bootstrap";
import {  useLoadScript } from "@react-google-maps/api";
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
    
};

 function songTimes(a, b) {
    const result = a / b
    return result.toFixed(2);
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
        setToken(data); 
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
        setGoogleToken(data); 
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

  const handleReset = () => {
    setSelectedSongName(null);
    setSelectedSongDuration(null);
    setTimeInMs(null);
  }

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
               
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
            <Card className="custom-google">
              <Card.Body>
                <Card.Title>Google Side</Card.Title>
               
                <MapWithAutocomplete
        origin="Origin Address"
        destination="Destination Address"
        onTimeCalculated={handleTimeCalculated}
        googleMapsApiKey={googleToken}
      />
      {/* {timeInMs !== null && <p>Time to travel: {timeInMs} ms</p>} */}
      <Home />
   
    
              </Card.Body>
            </Card >
            </Row>
            <Row>
              {timeInMs && selectedSongName ? <Card className="custom-result vertical-center">
                <Card.Body>
                  <Card.Title></Card.Title>
                  <p>It will take {songTimes(timeInMs, selectedSongDuration)} {selectedSongName}s to get where you are going.</p> 
                  <Button onClick={handleReset}>Reset</Button>
                </Card.Body>
              </Card>: <p></p>}
            </Row>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default App;
