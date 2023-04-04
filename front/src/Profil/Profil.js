import React, {useEffect, useState} from "react";
import axios from "axios";


export default function User(props) {
    const [user, setUser] = useState([]);

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

    useEffect(() => {
        (async () => {
            await getUser();
        })();
    }, []);

    return (
        <div className="Profil">
        <h1>Profil de {user.user_name}</h1>
        <ul className="Profil-infos">
          <li>Nom : {user.user_name}</li>
          <li>Prénom : {user.user_firstname}</li>
          <li>Email : {user.user_mail}</li>
          <li>Téléphone : {user.user_tel}</li>
        </ul>
      </div>
    );
}
