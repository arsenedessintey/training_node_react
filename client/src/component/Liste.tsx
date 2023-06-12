import { useEffect, useState } from 'react'

export default function Liste () {

    const tabListe = [
        {
            id: "Listeid",
            Regex1: "Liste de mot  à définir (avec un | entre chaque mot) :",
 
        }
    ]

    const [liste, setListe] = useState({

        VRegex1: ""

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setListe((prev) => {
            return { ...prev, [name]: value };
        })
    };

    return (

        <div>
            {tabListe.map(({ id, Regex1 }) => {
                return (<div key={id} >
                    <label>{Regex1}</label>
                    <input type="text" className="listechoix" id={id} name="VRegex1" value={liste.VRegex1} onChange={handleChange} /><br></br>
                </div>)
                })}
        </div>

)};