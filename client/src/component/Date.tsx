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
                            <input value="" style={{display:"none"}}></input>
                            <input value="" style={{display:"none"}}></input>
                            <input value="" style={{display:"none"}}></input>
                            <input value="" style={{display:"none"}}></input>
                            <label>{MMAAAA}</label>
                            <input type="checkbox" id={id} name="MMAAAA" value={date.MMAAAA.toString()} onChange={handleChange}  /><br></br>
                            <label>{DDMMAAAA}</label>
                            <input type="checkbox" id={id} name="DDMMAAAA" value={date.DDMMAAAA.toString()} onChange={handleChange}  /><br></br>
                            <input value="" style={{display:"none"}}></input>
                        </div>)
                    })}
            </div>
        </div>

)};