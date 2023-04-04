import logo from './logo.svg';
import './App.css';
import MyCalendar from './calendar/calendar';
import { Route, Routes, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav , NavDropdown} from "react-bootstrap";
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Authentification from './Authentification/Authentification.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {useCookies} from "react-cookie";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-xl ">
  <Link to="/accueil"><img className="navbar-logo" src={process.env.PUBLIC_URL + '/logo_projet_react.png'} alt="Logo" /></Link>
  <button className="navbar-toggler burger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon" ></span>
</button>
  <div className="collapse navbar-collapse" id="navbarNav">
  <div className="navbar-composants">
    <ul className="navbar-nav">
      <li className="nav-item ">
        <Link to="/accueil" className="nav-link">Accueil </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/calendrier" >Calendrier</Link>
      </li>
      <li className="nav-item">
        <Link to="/listegarages" className="nav-link">Liste des garages</Link>
      </li>
        <li className="nav-item">
          <Link to="/connexion" className="nav-link">Connexion</Link>
        </li>
    </ul>
  </div>
  </div>
 
</nav>

  );
  
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-items">
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#">Conditions d'utilisation</a></li>
              <li className="list-inline-item"><a href="#">Politique de confidentialité</a></li>
              <li className="list-inline-item"><a href="#">Contactez-nous</a></li>
            </ul>
        </div>
          <div className="footer-copyright">
            <p className="footer-text">© {new Date().getFullYear()} ADF Garages</p>
          </div> 
        </div>
    </footer>
  );
}

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["adf"]);
  return (
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"></link>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"></link>
          <link rel="icon" type="image/x-icon" src={process.env.PUBLIC_URL + '/favicon.ico'} />
      </Helmet>
     

        <div>

        <Navigation cookies={cookies} removeCookie={removeCookie} />
        <Routes>
        <Route exact={true} path='/calendrier' element={<MyCalendar/>}/>
        <Route path="/connexion" element={<Authentification setCookie={setCookie}/>} />
        </Routes>
        <Footer/>

        </div>
        <script src="https://unpkg.com/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
        <script src="https://unpkg.com/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
       

</div>

     
  );
}

export default App;
