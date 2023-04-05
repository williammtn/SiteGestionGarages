import { useState } from "react";

function GarageReservation() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [garageSelected, setGarageSelected] = useState(null);
  const [dateSelected, setDateSelected] = useState(null);
  const [timeSelected, setTimeSelected] = useState(null);

  const handleAgreeChange = (event) => {
    setIsAgreed(event.target.checked);
  };
  const handleClick = () => {
    window.location.href = "/connexion";
  };

  const handleGarageChange = (event) => {
    setGarageSelected(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateSelected(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTimeSelected(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAgreed && garageSelected && dateSelected && timeSelected) {
      // Envoyer la demande de réservation
      console.log("Demande de réservation envoyée !");
    } else {
      alert("Veuillez remplir tous les champs obligatoires et accepter les conditions d'utilisation.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: '140px',marginBottom: '7vh' }}>
          <h1>Réservation de garage</h1>
          <p>En utilisant ce site de réservation de garage, vous acceptez les conditions suivantes :</p>
          <ul>
              <li>Vous êtes responsable de la saisie des informations correctes de réservation.</li>
              <li>Vous devez respecter les horaires de votre réservation. Tout retard peut entraîner une annulation de la réservation.</li>
              <li>Vous devez accepter les termes et conditions de chaque garage pour pouvoir effectuer une réservation.</li>
              <li>Toute annulation doit être effectuée au moins 24 heures à l'avance.</li>
              <li>En cas d'annulation tardive ou de non-présentation, des frais peuvent être facturés.</li>
          </ul>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="garage">Garage :</label>
          <select id="garage" className="form-control" onChange={handleGarageChange}>
            <option value="">-- Choisissez un garage --</option>
            <option value="garage1">Feu Vert</option>
            <option value="garage2">Norauto</option>
            <option value="garage3">Speedy</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date :</label>
          <input type="date" id="date" className="form-control" onChange={handleDateChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="time">Heure :</label>
          <input type="time" id="time" className="form-control" onChange={handleTimeChange} required />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" id="agree" className="form-check-input" onChange={handleAgreeChange} required />
          <label htmlFor="agree" className="form-check-label">
            J'accepte les conditions d'utilisation.
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Réserver
        </button>
      </form>
    </div>
  );
}

export default GarageReservation;
