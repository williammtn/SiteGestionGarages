import React, { useState, useEffect } from 'react';
import axios from "axios";


function Garage() {
    const [garages, setGarages] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/garages')
          .then(response => response.json())
          .then(data => setGarages(data))
          .catch(error => console.error(error));
      }, []);
    return (
        <div className='garages-tab'>
            <h2>Liste des garages</h2>
            <ul>
                {garages.map((garage) => (
                    <li key={garage.garage_id}>
                        <h4>{garage.garage_name}</h4>
                        <p>Mécanique : {garage.garage_mechanics ? "Oui" : "Non"}</p>
                        <p>Carrosserie : {garage.garage_body ? "Oui" : "Non"}</p>
                        <p>{garage.garage_address}</p>
                        <p>{garage.garage_zipcode} {garage.garage_city}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Garage;