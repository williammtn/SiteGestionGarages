import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

export default function User(props) {
    const [user, setUser] = useState([]);
    const [rdv, setRdv] = useState([]);
    const [rdvliste, setRdvListe] = useState([]);
    const [activeTab,setActiveTab] = useState('profil');
    const navigate = useNavigate();
    async function getUser() {
        try {
            if (props.cookies && props.cookies.adf) {
                const response = await axios.request({
                    url: `http://localhost:8000/profil/${props.cookies.adf.id}`,
                    headers: {Authorization: "Bearer " + props.cookies.adf.token},
                })
                setUser(response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    async function getRdv() {
        try {
            if (props.cookies && props.cookies.adf) {
                const response = await axios.request({
                    url: `http://localhost:8000/appointment/${props.cookies.adf.id}`,
                    headers: {Authorization: "Bearer " + props.cookies.adf.token},
                })
                setRdv(response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    async function getListeRdv() {
        try {
            if (props.cookies && props.cookies.adf) {
                const response = await axios.request({
                    url: `http://localhost:8000/appointment_liste/${props.cookies.adf.id}`,
                    headers: {Authorization: "Bearer " + props.cookies.adf.token},
                })
                setRdvListe(response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    async function handleClick() {
        try {
            const response = await axios.delete(`http://localhost:8000/delete/${props.cookies.adf.id}`, {
                headers: {Authorization: "Bearer " + props.cookies.adf.token},
            });
            if(response.data.success === true){
               alert("erreur");
            }
            else{
                props.removeCookie("adf");
                navigate("/accueil");
            }               

        } catch (e) {
            console.error("ERR", e);

        }
    }
    async function handleSuppRdv(i) {
        try {
            const response = await axios.delete(`http://localhost:8000/appointment_delete/${i}`, {
                headers: {Authorization: "Bearer " + props.cookies.adf.token},
            });
            if(response.data.success !== true){
                alert("le rendez-vous a bien été supprimé");
                const maDiv = document.getElementById(i);
                maDiv.style.display = 'none';
                navigate(`/profil/${props.cookies.adf.id}#profil`);
            }
            else{
                alert("erreur");
            }               

        } catch (e) {
            console.error("ERR", e);

        }
    }

    async function getDispo() {
        try {
          if (props.cookies && props.cookies.adf) {
            const response = await axios.request({
              url: `http://localhost:8000/profile/disponibilities/${props.cookies.adf.id}`,
              headers: { Authorization: "Bearer " + props.cookies.adf.token },
            });
            setRdv(response.data);
          }
        } catch (error) {
          console.log("error", error);
        }
    }

    async function handleDeleteDispo(disponibilityId) {
        try {
          if (props.cookies && props.cookies.adf) {
            const response = await axios.request({
              url: `http://localhost:8000/profile/disponibilities/delete/${disponibilityId}`,
              headers: { Authorization: "Bearer " + props.cookies.adf.token },
              method: "DELETE",
            });
            console.log(response.data);
            getDispo();
          }
        } catch (error) {
          console.log("error", error);
        }
      }

    useEffect(() => {
        (async () => {
            await getUser();
            await getRdv();
            await getDispo();
            await getListeRdv();
        })();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
    const role = user.user_role;
    return (
        <div className="Profil">
        
        {role === 0 ? (
            <><ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item form-nav-item" role="presentation">
                        <a className={`nav-link ${activeTab === 'profil' ? 'active' : 'form-nav-link'}`} id="tab-profil" href="#profil" onClick={() => handleTabClick('profil')} role="tab"
                            aria-controls="pills-profil" aria-selected={activeTab === 'profil'}>Profil</a>
                    </li>
                    <li className="nav-item form-nav-item" role="presentation">
                        <a className={`nav-link ${activeTab === 'RDV' ? 'active' : 'form-nav-link'}`} id="tab-RDV" href="#RDV" onClick={() => handleTabClick('RDV')} role="tab"
                            aria-controls="pills-RDV" aria-selected={activeTab === 'RDV'}>Liste RDV</a>
                    </li>
                    <li className="nav-item form-nav-item" role="presentation">
                        <a className={`nav-link ${activeTab === 'modifier' ? 'active' : 'form-nav-link'}`} id="tab-modifier" href="#modifier" onClick={() => handleTabClick('modifier')} role="tab"
                            aria-controls="pills-modifier" aria-selected={activeTab === 'modifier'}>Modifier</a>
                    </li>
                </ul><div className="tab-content">
                        <div className={`tab-pane fade show ${activeTab === 'profil' ? 'active' : ''}`} id="pills-profil" role="tabpanel" aria-labelledby="tab-profil">
                            <h1>Profil de {user.user_name}</h1>
                            <ul className="Profil-infos">
                                <li>Nom : {user.user_name}</li>
                                <li>Prénom : {user.user_firstname}</li>
                                <li>Email : {user.user_mail}</li>
                                <li>Téléphone : {user.user_tel}</li>
                            </ul>
                        </div>

                        <div className={`tab-pane fade show ${activeTab === 'RDV' ? 'active' : ''}`} id="pills-RDV" role="tabpanel" aria-labelledby="tab-RDV">
                            <div className="rdv">

                                <ul>
                                    {rdv.map((rdvItem) => (
                                        <li key={rdvItem.id} id={rdvItem.appointment_id} className="liste-rdv">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">Rendez-vous du {rdvItem.disponibility_date}</h5>

                                                    <div className="rdv-items"><b>garage : </b> &nbsp;&nbsp;{rdvItem.garage_name}</div>
                                                    <div className="rdv-items"><b>heure_début : </b> &nbsp;&nbsp;{rdvItem.start_hour}</div>
                                                    <div className="rdv-items"><b>heure_fin : </b> &nbsp;&nbsp;{rdvItem.end_hour}</div>
                                                    <div className="rdv-items"><button type="button" className="btn btn-danger" onClick={() => handleSuppRdv(rdvItem.appointment_id)}>supprimer le RDV</button></div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        </div>
                        <div className={`tab-pane fade show ${activeTab === 'modifier' ? 'active' : ''}`} id="pills-modifier" role="tabpanel" aria-labelledby="tab-modifier">
                            <button type="button" className="btn btn-danger" onClick={() => handleClick()}>Supprimer compte</button>
                        </div>
                    </div></>

        ): (<><ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item form-nav-item" role="presentation">
                        <a className={`nav-link ${activeTab === 'profil' ? 'active' : 'form-nav-link'}`} id="tab-profil" href="#profil" onClick={() => handleTabClick('profil')} role="tab"
                            aria-controls="pills-profil" aria-selected={activeTab === 'profil'}>Profil</a>
                    </li>
                    <li className="nav-item form-nav-item" role="presentation">
                        <a className={`nav-link ${activeTab === 'RDV' ? 'active' : 'form-nav-link'}`} id="tab-RDV" href="#RDV" onClick={() => handleTabClick('RDV')} role="tab"
                            aria-controls="pills-RDV" aria-selected={activeTab === 'RDV'}>Liste RDV</a>
                    </li>
                    <li className="nav-item form-nav-item" role="presentation">
                        <a className={`nav-link ${activeTab === 'modifier' ? 'active' : 'form-nav-link'}`} id="tab-modifier" href="#modifier" onClick={() => handleTabClick('modifier')} role="tab"
                            aria-controls="pills-modifier" aria-selected={activeTab === 'modifier'}>Modifier</a>
                    </li>
                    <li className="nav-item form-nav-item" role="presentation">
                        <a className={`nav-link ${activeTab === 'creneaux' ? 'active' : 'form-nav-link'}`} id="tab-créneaux" href="#créneaux" onClick={() => handleTabClick('creneaux')} role="tab"
                            aria-controls="pills-creneaux" aria-selected={activeTab === 'creneaux'}>Créneaux</a>
                    </li>
                </ul><div className="tab-content">
                        <div className={`tab-pane fade show ${activeTab === 'profil' ? 'active' : ''}`} id="pills-profil" role="tabpanel" aria-labelledby="tab-profil">
                            <h1 className="display-4 mb-4">Profil de {user.user_name}</h1>
                            <ul className="list-group">
                                <li className="list-group-item"><strong>Nom :</strong> {user.user_name}</li>
                                <li className="list-group-item"><strong>Prénom :</strong> {user.user_firstname}</li>
                                <li className="list-group-item"><strong>Email :</strong> {user.user_mail}</li>
                                <li className="list-group-item"><strong>Téléphone :</strong> {user.user_tel}</li>
                            </ul>
                        </div>


                        <div className={`tab-pane fade show ${activeTab === 'RDV' ? 'active' : ''}`} id="pills-RDV" role="tabpanel" aria-labelledby="tab-RDV">
                        <div className="rdv">

                            <ul>
                                {rdvliste.map((rdvItem) => (
                                    <li key={rdvItem.id} id={rdvItem.appointment_id} className="liste-rdv">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">Rendez-vous du {rdvItem.disponibility_date}</h5>
                                                <div className="rdv-items"><b>Nom : </b> &nbsp;&nbsp;{rdvItem.user_name}</div>
                                                <div className="rdv-items"><b>Prénom : </b> &nbsp;&nbsp;{rdvItem.user_firstname}</div>
                                                <div className="rdv-items"><b>Téléphone : </b> &nbsp;&nbsp;{rdvItem.user_tel}</div>
                                                <div className="rdv-items"><b>Mail : </b> &nbsp;&nbsp;{rdvItem.appointment_id}</div>
                                                <div className="rdv-items"><b>Mail : </b> &nbsp;&nbsp;{rdvItem.user_mail}</div>
                                                <div className="rdv-items"><b>heure_début : </b> &nbsp;&nbsp;{rdvItem.start_hour}</div>
                                                <div className="rdv-items"><b>heure_fin : </b> &nbsp;&nbsp;{rdvItem.end_hour}</div>
                                                <div className="rdv-items"><button type="button" className="btn btn-danger" onClick={() => handleSuppRdv(rdvItem.appointment_id)}>supprimer le RDV</button></div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            </div>

                        </div>
                        <div className={`tab-pane fade show ${activeTab === 'modifier' ? 'active' : ''}`} id="pills-modifier" role="tabpanel" aria-labelledby="tab-modifier">
                            <button type="button" className="btn btn-danger" onClick={() => handleClick()}>Supprimer compte</button>
                        </div>

                        <div className={`tab-pane fade show ${activeTab === 'creneaux' ? 'active' : ''}`} id="pills-creneaux" role="tabpanel" aria-labelledby="tab-creneaux">
                    <div>
                            <h1>Créneaux du garage</h1>
                            <table style={{ margin: "0 auto", border: "1px solid black", borderCollapse: "collapse", marginTop: "20px", marginBottom: "50px"}}>
                                <thead>
                                    <tr>
                                    <th>Date</th>
                                    <th>Début</th>
                                    <th>Fin</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rdv.map((item) => (
                                    <tr key={item.disponibility_id}>
                                        <td>{item.disponibility_date}</td>
                                        <td>{item.start_hour}</td>
                                        <td>{item.end_hour}</td>
                                        <td><button class="btn btn-danger btn-sm" onClick={() => handleDeleteDispo(item.disponibility_id)}>Supprimer</button></td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div></>

        )}
    
    </div>
    );

}
