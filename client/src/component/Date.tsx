import { useEffect, useState } from 'react'

export default function Date () {

    const tabDate = [
        {
            id: "Dateid",
            Regex1: "Format AAAA/MM :",
            Regex2: "Format AAAA/MM/DD :",
 
        }
    ]

    const [date, setDate] = useState({

        MMAAAA: "",
        DDMMAAAA: ""

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setDate((prev) => {
            return { ...prev, [name]: value };
        })
    };

    return (

        <div>
            {tabDate.map(({ id, MMAAAA, DDMMAAAA }) => {
                return (<div key={id} >
                    <label>{MMAAAA}</label>
                    <input type="checkbox" id={id} name="VRegex2" value= "" onChange={handleChange} /><br></br>
                    <label>{DDMMAAAA}</label>
                    <input type="checkbox" id={id} name="VRegex2" value= "" onChange={handleChange} /><br></br>
                </div>)
                })}
        </div>

)};