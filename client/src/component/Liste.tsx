import axios from 'axios';
import { useEffect, useState } from 'react'
import "../App.css";

export default function Liste () {

    const tabListe = [
        {
            id: "Listeid",
            Liste: "Liste de mot  à définir (avec un | entre chaque mot) :",
 
        }
    ]

    const [liste, setListe] = useState({

        Liste: ""

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setListe((prev) => {
            return { ...prev, [name]: value };
        })
            
    };

    const Sub = () => {

        axios.post(`/api/regex`, liste)
        .then((response) => {
            console.log(response.status);

            })
        .catch((error) => {
            console.log(error);
            });

        }

    return (
        <div>
            <div className="divRegex">
                {tabListe.map(({ id, Liste }) => {
                    return (<div key={id} >
                        <label>{Liste}</label>
                        <input type="text" className="listechoix" id={id} name="Liste" value={liste.Liste} onChange={handleChange} /><br></br>
                    </div>)
                })}
            </div>
            <div className="cntbuttonRegex">
                    <button className="buttonRegex" onClick={Sub}>Validé</button>
            </div>
        </div>

)};