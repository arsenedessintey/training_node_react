import { useEffect, useState } from 'react'

export default function Date () {

    const tabCodeBar = [
        {
            id: "Dateid",
            Regex1: "Format AAAA/MM :",
            Regex2: "Format AAAA/MM/DD :",
 
        }
    ]

    const [codeBar, setCodeBar] = useState({

        VRegex1: "",
        VRegex2: ""

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCodeBar((prev) => {
            return { ...prev, [name]: value };
        })
    };

    return (

        <div>
            {tabCodeBar.map(({ id, Regex1, Regex2 }) => {
                return (<div key={id} >
                    <label>{Regex1}</label>
                    <input type="checkbox" id={id} name="VRegex2" value= "" onChange={handleChange} /><br></br>
                    <label>{Regex2}</label>
                    <input type="checkbox" id={id} name="VRegex2" value= "" onChange={handleChange} /><br></br>
                </div>)
                })}
        </div>

)};