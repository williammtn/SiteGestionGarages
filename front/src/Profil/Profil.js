import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

export default function User(props) {
    const [user, setUser] = useState([]);
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
    useEffect(() => {
        (async () => {
            await getUser();
        })();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    return (
        <div className="Profil">
    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
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
    </ul>

    <div className="tab-content">
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
        
        </div>
        <div className={`tab-pane fade show ${activeTab === 'modifier' ? 'active' : ''}`} id="pills-modifier" role="tabpanel" aria-labelledby="tab-modifier">
            <button type="button" className="btn btn-danger" onClick={() => handleClick()}>Supprimer compte</button>
        </div>


        </div>
    </div>);

}
