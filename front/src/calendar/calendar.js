import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import "../App.css";
import { NamedTimeZoneImpl } from "@fullcalendar/core/internal";


function MyCalendar(props) {
  const [events, setEvents] = useState([]);
  const [garages, setGarages] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [disponibilities, setDisponibilities] = useState([]);
  const [selectedGarageId, setSelectedGarageId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/appointment")
      .then((response) => {
        const formattedEvents = response.data.map((event) => ({
          title: event.appointment_name,
          start: event.appointment_date,
          end: event.appointment_date,
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
          garageId: garage.garage_id,
          name: garage.garage_name,
          city: garage.garage_city,
        }));
        setGarages(garageToSelect);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleGarageChange = (event) => {
    const selectedId = event.target.value;
    setSelectedGarageId(selectedId);

    axios
      .get(`http://localhost:8000/benefits/${selectedId}`)
      .then((response) => {
        setBenefits(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:8000/disponibilities/${selectedId}`)
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
  console.log(benefits[e.target.selectedIndex])
  setBenefit(selectedBenefit.benefits_id);
}



  const handleOptionChange = (e) => {
    setSelectedDisponibilityID(e.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();

  const data = {
    userId: props.cookies.adf.id,
    garageId: selectedGarageId,
    benefits_id: benefit,
    disponibility_id: selectedDisponibilityID
  };

console.log(data)
  axios.post('/appointment', data)
    .then((response) => {
      alert('Appointment created successfully!');
    })
    .catch((error) => {
      alert('Failed to create appointment.');
    });
};

  return (
    <div>
      <div className="form">
        <div>
          <form className="col-8" method="post" onSubmit={handleSubmit}>
            <div>
              <select onChange={handleGarageChange}>
                <option></option>
                {garages.map((garage) => (
                  <option key={garage.garageId} value={garage.garageId}>
                    {garage.name}
                  </option>
                ))}
              </select>
              <div>
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
              </div>
              <div className="row">
                {disponibilities.map((disponibility) => (
                  <>
                    <div>
                      <label key={disponibility.disponibility_id} for="dispo" className="mr-2">
                        {disponibility.disponibility_date +
                          " " +
                          disponibility.start_hour +
                          " - " +
                          disponibility.end_hour}
                      </label>
                      <input onChange={handleOptionChange}
                        key={disponibility.disponibility_id}
                        type="radio"
                        name="dispo"
                        value={disponibility.disponibility_id}
                      />
                    </div>
                  </>
                ))}
              </div>
              <div>
                <button type="submit" class="btn btn-primary btn-block mb-4 col-3">
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
