import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav , NavDropdown} from "react-bootstrap";


function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" class="navbar" variant="dark">
  <Navbar.Brand ><Link to="/accueil"><img className="navbar-logo" src={process.env.PUBLIC_URL + '/logo_projet_react.png'} alt="Logo" /></Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="navbar-composants">
      <Nav.Link className="navbar-composant"><Link to="/accueil">accueil</Link></Nav.Link>
      <Nav.Link className="navbar-composant"><Link to="/calendrier">calendrier</Link></Nav.Link>
      <Nav.Link className="navbar-composant"><Link to="/listegarages">Liste des garages</Link></Nav.Link>
      <Nav.Link className="navbar-composant"><Link to="/connexion">Connexion</Link></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <>
      <Navigation/>
      <Routes>
      </Routes>
    </>
      </header>
    </div>
  );
}

export default App;
