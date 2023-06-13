import axios from 'axios';
import { useEffect, useState } from 'react'
import "../App.css";

export default function Date () {

    const tabDate = [
        {
            id: "Dateid",
            MMAAAA: "Format MM/AAAA :",
            DDMMAAAA: "Format DD/MM/AAAA :",
 
        }
    ]

    const [date, setDate] = useState({

        MMAAAA: "false",
        DDMMAAAA: "false"

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setDate((prev) => {
            return { ...prev, MMAAAA: "false", DDMMAAAA: "false" };
        })
        const { name, value } = e.target;
        setDate((prev) => {
            return { ...prev, [name]: value };
        })
            
    };

    const Sub = () => {
        
        axios.post(`/api/regex`, date)
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
                    {tabDate.map(({ id, MMAAAA, DDMMAAAA }) => {
                        return (<div key={id} >
                            <label>{MMAAAA}</label>
                            <input type="checkbox" id={id} name="MMAAAA" value= "true" onChange={handleChange} /><br></br>
                            <label>{DDMMAAAA}</label>
                            <input type="checkbox" id={id} name="DDMMAAAA" value= "true" onChange={handleChange} /><br></br>
                        </div>)
                    })}
            </div>
            <div className="cntbuttonRegex">
                    <button className="buttonRegex" onClick={Sub}> Validé </button>
            </div>
        </div>

)};