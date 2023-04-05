import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function Garage() {
    const [garages, setGarages] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:8000/garages')
        .then((response) => response.json())
        .then((data) => setGarages(data))
        .catch((error) => console.error(error));
    }, []);
  
    return (
        <div className='Garage_tab' style = {{paddingTop:'100px', marginBottom: '43vh'}}>
            <Container className='mt-5'>
                <h2>Liste des garages</h2>
                <Row>
                {garages.map((garage) => (
                    <Col md={4} key={garage.garage_id}>
                    <Card>
                        <Card.Body>
                        <Card.Title>{garage.garage_name}</Card.Title>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                            <strong>Mécanique :</strong>{' '}
                            {garage.garage_mechanics ? 'Oui' : 'Non'}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <strong>Carrosserie :</strong>{' '}
                            {garage.garage_body ? 'Oui' : 'Non'}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <strong>Adresse :</strong> {garage.garage_address}
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <strong>Code Postal et Ville :</strong>{' '}
                            {garage.garage_zipcode} {garage.garage_city}
                            </ListGroup.Item>
                        </ListGroup>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            </Container>
            </div>
    );
  }

export default Garage;