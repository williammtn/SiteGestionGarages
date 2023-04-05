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
import User from './Profil/Profil';
import Garage from './Garages/Garages';
import SliderFunction from './slider/slider';
import GarageReservation from './footer/condition';
import PrivacyPolicy from './footer/confidentialite';
import ContactUs from './footer/contact';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";


function Navigation(props) {
  const navigate = useNavigate();

  function handleLogout() {
    props.removeCookie("adf");

    navigate("/accueil");
  }

  let mail;
  let id;
  if (props.cookies && props.cookies.adf && props.cookies.adf.mail && props.cookies.adf.id) {
    mail = props.cookies.adf.mail;
    id = props.cookies.adf.id;
}

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
      {mail !== undefined &&
        <li className="nav-item">
          <Link className="nav-link" to={`/profil/${id}`} ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> {mail}</Link>
        </li>
          
      }
      {mail === undefined ?
        <li className="nav-item">
          <Link to="/connexion" className="nav-link">Connexion</Link>
        </li> :
        <button type="btn" className="nav-btn" onClick={handleLogout}>Déconnexion</button>
      }
        
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
              <Link to="/condition" className="nav-link">Conditions d'utilisation</Link>
              <Link to="/politique" className="nav-link">Politiques de Confidentialité</Link>
              <Link to="/contact" className="nav-link">Contactez-nous</Link>
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
  const location = useLocation();

  useEffect(() => {
    const accueil = location.pathname;
    if(accueil == "/"){
      window.location = "http://localhost:3000/accueil";
    }
    const title = location.pathname.substring(1);
    document.title = `ADF - ${title}`;
  }, [location]);
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
        <Route exact={true} path='/calendrier' element={<MyCalendar cookies={cookies}/>}/>
        <Route exact={true} path='/listegarages' element={<Garage cookies={cookies}/>}/>
        <Route path="/connexion" element={<Authentification setCookie={setCookie}/>} />
        <Route path="/accueil" element={<SliderFunction/>} />
        <Route path="/condition" element={<GarageReservation/>}/>
        <Route path="/politique" element={<PrivacyPolicy/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="profil/:id" element={<User cookies={cookies} removeCookie={removeCookie} />} />
        </Routes>
        <Footer/>

        </div>

        <script src="https://unpkg.com/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
        <script src="https://unpkg.com/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
       

</div>

     
  );

}

export default App;
