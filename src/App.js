import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import SongList from "./SongList";
import SongForm from "./SongForm";

function App() {
  const [token, setToken] = useState("");
  const [selectedSongDuration, setSelectedSongDuration] = useState(0);

  const handleSongSelect = (durationMs) => {
    setSelectedSongDuration(durationMs);
  };

  const fetchToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/test");

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

  useEffect(() => {
    fetchToken();
  }, []);

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

                <SongForm accessToken={token} onSongSelect={handleSongSelect} />
                <p>Selected Song Duration: {selectedSongDuration} ms</p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="custom-google">
              <Card.Body>
                <Card.Title>Google Side</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formOrigin">
                    <Form.Label>Origin</Form.Label>
                    <Form.Control type="text" placeholder="Origin" />
                    <Form.Text className="text-muted">
                      Enter Starting Point
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDestination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" placeholder="Destination" />
                    <Form.Text className="text-muted">
                      Enter Ending Point
                    </Form.Text>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mb-3">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
