import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import "../App.css";
import { NamedTimeZoneImpl } from "@fullcalendar/core/internal";

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [garages, setGarages] = useState([]);
  const [benefits, setBenefits] = useState([]);
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
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [garageId, setGarageId] = useState("");
  const [benefitId, setBenefitId] = useState("");
  const [date, setDate] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = {
  //     date: date,
  //     name: titre,
  //     duration: date
  //     garageId: garageId,
  //     benefitId: benefitId,
  //     date: date,
  //   };
  //   axios.post("/appointment", data).then((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <div>
      <div className="form">
        <div>
          <form>
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
                <select>
                  {benefits.map((benefit) => (
                    <option key={benefit.benefits_id} value={benefit.benetfits_id}>{benefit.benefits_name}</option>
                  ))}
                </select>
              </div>
              {/* <div>
                <input type="hidden" name="titre" value="RDV de : "/>
              </div> */}
              <div>
              <button type="submit" class="btn btn-primary btn-block mb-4">Valider</button>
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
