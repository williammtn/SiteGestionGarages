import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";

function Garage(props) {
  const [garages, setGarages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormAddGarage, setShowFormAddGarage] = useState(false);
  const [selectedGarageId, setSelectedGarageId] = useState(null);
  const [selectedUserConnected, setSelectedUserConnected] = useState(null);
  const [selectUsers, setSelectUsers] = useState([]);
  const [user, setUser] = useState([]);

  async function getUser() {
    try {
        if (props.cookies && props.cookies.adf) {
            const response = await axios.request({
                url: `http://localhost:8000/profil/${props.cookies.adf.id}`,
                headers: {Authorization: "Bearer " + props.cookies.adf.token},
            })
            setUser(response.data);
        }
    } catch (error) {
        console.log("error", error);
    }
}
  useEffect(() => {
    fetch("http://localhost:8000/garages")
      .then((response) => response.json())
      .then((data) => setGarages(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user")
      .then((response) => setSelectUsers(response.data))
      .catch((error) => console.error(error));
  }, []);


  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/disponibilities", {
        garage_id: selectedGarageId,
        date: e.target.date.value,
        start_hour: e.target.start_hour.value,
        end_hour: e.target.end_hour.value,
      })
      .then(() => {
        setShowForm(false);
        alert("Le créneau a bien été enregistré");
      })
      .catch((error) => console.error(error));
  };

  const handleSubmitFormAddGarage = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/garages", {
        name: e.target.garage_name.value,
        mechanics: e.target.garage_mechanics.value,
        body: e.target.garage_body.value,
        address: e.target.garage_address.value,
        zipcode: e.target.garage_zipcode.value,
        city: e.target.garage_city.value,
        garage_opening: e.target.garage_opening.value,
        garage_closing: e.target.garage_closing.value,
        user_id: e.target.user_id.value,
      })
      .then(() => {
        setShowFormAddGarage(false);
        alert("Le garage a bien été enregistré");
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

  let prop = props.cookies.adf.id;
  const handleShowFormAddGarage = () => {
    if (selectedUserConnected === prop) {
      setShowFormAddGarage(false);
      setSelectedUserConnected(null);
    } else {
      setShowFormAddGarage(true);
      setSelectedUserConnected(prop);
    }
  };

  useEffect(() => {
    (async () => {
        await getUser();
    })();
}, []);

  return (
    <div
      className="Garage_tab"
      style={{ paddingTop: "100px", marginBottom: "43vh" }}
    >
      <Container className="mt-5">
        <h2>Liste des garages</h2>
        <Row>
          {garages.map((garage) => (
            <Col md={4} key={garage.garage_id}>
              <Card>
                <Card.Body>
                  <Card.Title>{garage.garage_name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Mécanique :</strong>{" "}
                      {garage.garage_mechanics ? "Oui" : "Non"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Carrosserie :</strong>{" "}
                      {garage.garage_body ? "Oui" : "Non"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Adresse :</strong> {garage.garage_address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Code Postal et Ville :</strong>{" "}
                      {garage.garage_zipcode} {garage.garage_city}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    {garage.user_id === user.user_id ? (<button
                        class="btn btn-primary"
                        onClick={() => handleShowForm(garage.garage_id)}
                      >
                        Ajouter un créneau
                      </button>
                      )
                      :
                      null
                      }
                      
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                {showForm && selectedGarageId === garage.garage_id && (
                  <form onSubmit={handleSubmitForm}>
                    <input
                      type="hidden"
                      name="garage_id"
                      value={garage.garage_id}
                    />
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="TestCyDate" name="date" />
                    <label htmlFor="start_hour">Heure de début:</label>
                    <input type="time" id="TestCyDebutHeure" name="start_hour" />
                    <label htmlFor="end_hour">Heure de fin:</label>
                    <input type="time" id="TestCyFinHeure" name="end_hour" />
                    <button class="btn btn-success btn-sm" type="submit">
                      Ajouter
                    </button>
                  </form>
                )}
              </Card>
            </Col>
          ))}
        </Row>
        { user.user_role === 1 ? (
        <button
          class="btn btn-primary mt-2 mb-2"
          onClick={() => handleShowFormAddGarage()}
        >
          Ajouter mon garage
        </button>):null}

        {showFormAddGarage && selectedUserConnected === prop && (
          <form onSubmit={handleSubmitFormAddGarage}>
            <select name="user_id" className="mb-2">
                <option></option>
              {selectUsers.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.user_name + " " + user.user_firstname}
                </option>
              ))}
            </select>
            <div>
                <div>
                    {/* <label htmlFor="garage_name">Nom</label> */}
                    <input type="text" name="garage_name" placeholder="Nom" className="mb-2"/>
                </div>
                <div>
                    <label htmlFor="garage_mechanics" className="mr-2">Mécanique</label>
                    <input type="checkbox" name="garage_mechanics" />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="garage_body" className="mr-2">Carrosserie</label>
                    <input type="checkbox" name="garage_body" />
                </div>
                <div>
                    {/* <label htmlFor="garage_address">Adresse</label> */}
                    <input type="text" name="garage_address" placeholder="Adresse" className="mb-2"/>
                </div>
            </div>
            <div>
                <div>
                    {/* <label htmlFor="garage_zipcode">Code postal</label> */}
                    <input type="text" name="garage_zipcode" placeholder="Code postal" className="mb-2"/>
                </div>
                <div>
                    {/* <label htmlFor="garage_city">Ville</label> */}
                    <input type="text" name="garage_city" placeholder="Ville" className="mb-2"/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="garage_opening">Heure d'ouverture</label>
                    <input type="time" name="garage_opening" />
                </div>
                <div>
                    <label htmlFor="garage_closing ">Heure de fermeture</label>
                    <input type="time" name="garage_closing" />
                </div>
            </div>
            <button class="btn btn-success btn-sm" type="submit">
              Ajouter
            </button>
          </form>
        )}
      </Container>
    </div>
  );
}

export default Garage;
