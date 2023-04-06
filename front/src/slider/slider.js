import Carousel from 'react-bootstrap/Carousel';

function SliderFunction() {
  return (
    <div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://fv-cdn-prod-endpoint.azureedge.net/Custom/hub-bg-small.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Feu Vert</h3>
          <p>Feu Vert est un réseau français de centres automobiles dédié à la vente d'équipements et à l'entretien des véhicules légers.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.pagesjaunes.fr/media/agc/44/f1/91/00/00/7b/a6/86/a5/52/62bc44f19100007ba686a552/62bc44f19100007ba686a553.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Norauto</h3>
          <p>Norauto est une franchise de centres auto déployée sur toute la France et à l'international. Les centres Norauto sont constitués d'un magasin en libre-service et d'un atelier de réparation et entretien.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.eurofleet.fr/img/speedy_centre_1920.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Speedy</h3>
          <p>
          Speedy France est une entreprise française d'entretien et réparation rapide automobile
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div className='container' style={{textAlign: "center", marginBottom: "8vh"}}>
      <div style={{textAlign: "center"}}>
        <h1 style={{fontSize: "36px", fontWeight: "bold", color: "#4B4B4B",  marginBottom: "5vh", marginTop: "5vh"}}>ADF Garages</h1>
      </div>
      <div style={{fontSize: "20px", lineHeight: 1.5, color: "#6C6C6C"}}>
        <p>ADF Garage est l'application qu'il vous faut pour réserver facilement un créneau pour votre voiture. Que vous soyez un automobiliste à la recherche d'un garage fiable ou un prestataire de garage souhaitant offrir vos services, notre application est là pour vous aider.</p>
        <p>En tant que prestataire, vous pouvez facilement enregistrer votre garage sur notre application en précisant les services que vous offrez et les créneaux horaires disponibles pour les réservations. Les utilisateurs peuvent ensuite parcourir les différentes offres de garage et choisir un créneau horaire qui convient à leur emploi du temps. C'est facile, rapide et pratique !</p>
      </div>
      </div>
    </div>
  );
}

export default SliderFunction;