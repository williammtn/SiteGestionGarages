import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';

function Garage() {
    const [garages, setGarages] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedGarageId, setSelectedGarageId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/garages')
            .then((response) => response.json())
            .then((data) => setGarages(data))
            .catch((error) => console.error(error));
    }, []);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/disponibilities', {
            garage_id: selectedGarageId,
            date: e.target.date.value,
            start_hour: e.target.start_hour.value,
            end_hour: e.target.end_hour.value
        })
            .then(() => {
                setShowForm(false);
                alert("Le créneau a bien été enregistré");
            })
            .catch((error) => console.error(error));
    };

    const handleShowForm = (garageId) => {
        if (selectedGarageId === garageId) {
          setShowForm(false);
          setSelectedGarageId(null);
        } else {
          setShowForm(true);
          setSelectedGarageId(garageId);
        }
      };
      

    return (
        <div className='Garage_tab' style={{ paddingTop: '100px', marginBottom: '43vh' }}>
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
                                        <ListGroup.Item>
                                            <button class="btn btn-primary" onClick={() => handleShowForm(garage.garage_id)}>Ajouter un créneau</button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                {showForm && selectedGarageId === garage.garage_id && (
                                    <form onSubmit={handleSubmitForm}>
                                        <input type="hidden" name="garage_id" value={garage.garage_id} />
                                        <label htmlFor="date">Date:</label>
                                        <input type="date" name="date" />
                                        <label htmlFor="start_hour">Heure de début:</label>
                                        <input type="time" name="start_hour" />
                                        <label htmlFor="end_hour">Heure de fin:</label>
                                        <input type="time" name="end_hour" />
                                        <button class="btn btn-success btn-sm" type="submit">Ajouter</button>
                                    </form>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Garage;