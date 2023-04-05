import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import Select from "react-select";
import "../App.css";
import { NamedTimeZoneImpl } from "@fullcalendar/core/internal";

function MyCalendar(props) {
  const [events, setEvents] = useState([]);
  const [garages, setGarages] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [disponibilities, setDisponibilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGarageId, setSelectedGarageId] = useState("");
  const [selectedGarage, setSelectedGarage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/appointment")
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          title: event.benefits_name,
          start: event.disponibility_date,
          end: event.disponibility_date,
          allDay: false,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/garages")
      .then((response) => {
        const garageToSelect = response.data.map((garage) => ({
          value: garage.garage_id,
          label: garage.garage_name,
          city: garage.garage_city,
        }));
        setGarages(garageToSelect);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredOptions = garages.filter((garage) =>
    garage.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleGarageChange = (selectedOption) => {
    setSelectedGarageId(selectedOption.value);

    axios
      .get(`http://localhost:8000/benefits/${selectedOption.value}`)
      .then((response) => {
        setBenefits(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:8000/disponibilities/${selectedOption.value}`)
      .then((responsedispo) => {
        setDisponibilities(responsedispo.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [benefit, setBenefit] = useState("");
  const [selectedDisponibilityID, setSelectedDisponibilityID] = useState("");

  const handleBenefitChange = (e) => {
    const selectedBenefit = benefits[e.target.selectedIndex];
    setBenefit(selectedBenefit.benefits_id);
  };

  const handleOptionChange = (e) => {
    setSelectedDisponibilityID(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      user_id: props.cookies.adf.id,
      garage_id: selectedGarageId,
      benefits_id: benefit,
      disponibility_id: selectedDisponibilityID,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/appointment",
        data
      );
      const responsePatch = await axios.patch(
        `http://localhost:8000/disponibilities/${selectedDisponibilityID}`,
        data
      );
      if (response.status === 201 && responsePatch.status === 201) {
        alert("Appointment created successfully!");
      } else {
        throw new Error("Failed to create appointment.");
      }
    } catch (error) {
      alert(`Error creating appointment: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="form">
        <div>
          <form className="col-8" method="post" onSubmit={handleSubmit}>
            <div>
              <div className="container my-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                    <label>Trouver un prestataire</label>
                      <input
                        type="text"
                        placeholder="Recherche"
                        className="form-control"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                  <label>Choisir un garage</label>
                    <Select
                      options={filteredOptions}
                      value={selectedGarage}
                      onChange={handleGarageChange}
                      isClearable
                      dataCY = "reports-menu"
                    />
                  </div>
                </div>
              </div>
              <div>
              <label>Type de prestation :</label><br/>
                <select onChange={handleBenefitChange}>
                  {benefits.map((benefit) => (
                    <option
                      key={benefit.benefits_id}
                      value={benefit.benefits_id}
                    >
                      {benefit.benefits_name}
                    </option>
                  ))}
                </select>
              </div><br/>
              <label>Choix du créneau :</label>
              <div className="row">
                {disponibilities.map((disponibility) => {
                  return(
                    <div onChange={handleOptionChange}>
                      <label
                        key={disponibility.disponibility_id}
                        for="dispo"
                        className="mr-2"
                      >
                        {disponibility.disponibility_date +
                          " " +
                          disponibility.start_hour +
                          " - " +
                          disponibility.end_hour}
                      </label>
                      <input
                        id = "TestButtonCY"
                        key={disponibility.disponibility_id}
                        type="radio"
                        name="dispo"
                        value={disponibility.disponibility_id}
                      />
                    </div>
                  );
                })}
              </div>
              <div>
                <button
                  type="submit"
                  class="btn btn-primary btn-block mb-4 col-3"
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
      />
    </div>
  );
}

export default MyCalendar;
