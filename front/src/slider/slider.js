import Carousel from 'react-bootstrap/Carousel';

function SliderFunction() {
  return (
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
  );
}

export default SliderFunction;