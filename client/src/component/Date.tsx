import axios from 'axios';
import { useEffect, useState } from 'react'
import "../App.css";

export default function Date () {

    const tabDate = [
        {
            id: "Dateid",
            MMAAAA: "Format YYYY/MM :",
            DDMMAAAA: "Format YYYY/MM/DD :",
 
        }
    ]

    const [date, setDate] = useState({

        MMAAAA: false,
        DDMMAAAA: false

      })

    const handleChange = (e: any) => {
        const { name, checked } = e.target;
        setDate((prev) => {
            return { ...prev, [name]: checked };
        })
            
    };

    return (
        <div>
            <div className="divRegex">
                    {tabDate.map(({ id, MMAAAA, DDMMAAAA }) => {
                        return (<div key={id} >
                            <input defaultValue="" style={{display:"none"}}></input>
                            <input defaultValue="" style={{display:"none"}}></input>
                            <input defaultValue="" style={{display:"none"}}></input>
                            <input defaultValue="" style={{display:"none"}}></input>
                            <label>{MMAAAA}</label>
                            <input className="CheckMMAAAA" type="checkbox" id={id} name="MMAAAA" value={date.MMAAAA.toString()} onChange={handleChange}  /><br></br>
                            <label>{DDMMAAAA}</label>
                            <input className="CheckDDMMAAAA" type="checkbox" id={id} name="DDMMAAAA" value={date.DDMMAAAA.toString()} onChange={handleChange}  /><br></br>
                            <input defaultValue="" style={{display:"none"}}></input>
                        </div>)
                    })}
            </div>
        </div>

)};