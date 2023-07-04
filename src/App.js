
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function App() {
 
  // const [token, setToken] = useState('');

  useEffect(() => {
    fetch('localhost:3001/api/test')
    .then(response => {
      response.json()
      .then(json => {
        console.log(json)
      });
    });
  })


  return (
    <>
   
      <Container>
        <Row>
          <Col><h1>Distance in Song</h1></Col>
        </Row> 
        <Row>
        <Col>
         <Card className="custom-spotify">
          <Card.Body>
            <Card.Title>Spotify Side</Card.Title>
            <Form>
      <Form.Group className="mb-3" controlId="formSongTitle">
        <Form.Label>Song Title</Form.Label>
        <Form.Control type="text" placeholder="Song Title" />
        <Form.Text className="text-muted">
          Enter the Song of your Choice
        </Form.Text>
      </Form.Group>

     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
          </Card.Body>
         </Card>
        </Col>
        <Col>
         <Card className='custom-google'>
          <Card.Body>
            <Card.Title>Google Maps Side</Card.Title>
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

     
      <Button variant="primary" type="submit">
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
