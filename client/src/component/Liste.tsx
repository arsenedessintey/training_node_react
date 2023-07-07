import axios from 'axios';
import { useEffect, useState } from 'react'
import "../App.css";

export default function Liste () {

    const tabListe = [
        {
            id: "Listeid",
            creListe: "Liste de mot  à définir (avec un | entre chaque mot) :",
 
        }
    ]

    const [liste, setListe] = useState({

        creListe: "",

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setListe((prev) => {
            return { ...prev, [name]: value };
        })
            
    };

    return (
        <div>
            <div className="divRegex">
                {tabListe.map(({ id, creListe }) => {
                    return (<div key={id} >
                        <label>{creListe}</label>
                        <input defaultValue="" style={{display:"none"}}></input>
                        <input defaultValue="" style={{display:"none"}}></input>
                        <input defaultValue="" style={{display:"none"}}></input>
                        <input defaultValue="" style={{display:"none"}}></input>
                        <input defaultValue="" style={{display:"none"}}></input>
                        <input defaultValue="" style={{display:"none"}}></input>
                        <input type="text" className="listechoix" id={id} name="creListe" value={liste.creListe} onChange={handleChange} /><br></br>
                    </div>)
                })}
            </div>
        </div>

)};