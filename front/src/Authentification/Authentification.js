import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Authentification(props) {
    const [activeTab,setActiveTab] = useState('login');
    const [person, setPerson] = useState({mail: "", password: "", id: ""});

    const navigate = useNavigate();

    function handleTextChange(e, label) {
        setPerson({...person, [label]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post("http://localhost:8000/signin", person)).data;
            if (response.token === undefined) {
                alert("échec de connexion");
            } else {
                props.setCookie("adf", {mail: person.mail, token: response.token, id: response.id}, "/");
                navigate("/accueil");
            }
            setPerson({mail: "", password: "", id: ""});
        } catch (e) {
            console.error("ERR", e);
        }
    }

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    return (
        <div className='authentification'>
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item form-nav-item" role="presentation">
                    <a className={`nav-link ${activeTab === 'login' ? 'active' : 'form-nav-link'}`} id="tab-login" href="#" onClick={() => handleTabClick('login')} role="tab"
                        aria-controls="pills-login" aria-selected={activeTab === 'login'}>Connexion</a>
                </li>
                <li className="nav-item form-nav-item" role="presentation">
                    <a className={`nav-link ${activeTab === 'register' ? 'active' : 'form-nav-link'}`} id="tab-register" href="#" onClick={() => handleTabClick('register')} role="tab"
                        aria-controls="pills-register" aria-selected={activeTab === 'register'}>S'enregistrer</a>
                </li>
            </ul>

            <div className="tab-content">
                <div className={`tab-pane fade show ${activeTab === 'login' ? 'active' : ''}`} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form onSubmit={handleSubmit} method='POST'>
                        <div class="form-outline mb-4">
                            <input type="email" id="loginName" class="form-control" placeholder='Email' value={person.mail} onChange={e => handleTextChange(e, "mail")}/>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="password" id="loginPassword" class="form-control" placeholder='Mot de passe' value={person.password} onChange={e => handleTextChange(e, "password")}/>
                        </div>

                        <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
                    </form>
                </div>

                <div className={`tab-pane fade show ${activeTab === 'register' ? 'active' : ''}`} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form>
                        <div class="form-outline mb-4">
                            <input type="text" id="registerName" class="form-control" placeholder='Nom'/>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="text" id="registerFirstname" class="form-control" placeholder='Prénom'/>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="email" id="registerEmail" class="form-control" placeholder='Email'/>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="password" id="registerPassword" class="form-control" placeholder='Mot de passe'/>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="tel" id="registerPhone" class="form-control" placeholder='Téléphone'/>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="text" id="registerAddress" class="form-control" placeholder='Adresse'/>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="text" id="registerCity" class="form-control" placeholder='Ville'/>
                        </div>

                        <div class="form-outline mb-4">
                            <input type="text" id="registerZipCode" class="form-control" placeholder='Code Postal'/>
                        </div>

                        <button type="submit" class="btn btn-primary btn-block mb-3">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Authentification;
