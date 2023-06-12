import { useEffect, useState } from 'react'
import axios from 'axios';

export default function CodeBar () {

    const tabCodeBar = [
        {
            id: "CodeBarid",
            Regex1: "Nombre de caractère max : ",
            Regex2: "Uniquement des chiffres : ",
            Regex3: "Uniquement des lettres : "
        }
        // { 
        //     value: {props.value},
        //     id : "Listeid",
        //     Regex1: "Liste de mot  à définir (avec un | entre chaque mot) :",      
        // },

    ]

    const [codeBar, setCodeBar] = useState({

        VRegex1: "",
        VRegex2: "",
        VRegex3: ""

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCodeBar((prev) => {
            return { ...prev, [name]: value };
        })
    };

    return (

        <div>
            {tabCodeBar.map(({ id, Regex1, Regex2, Regex3 }) => {
                return (<div key={id} >
                    <label>{Regex1}</label>
                    <input type="text" className="MaxMin" id={id} name="VRegex1" placeholder="de" value={codeBar.VRegex1} onChange={handleChange} />
                    <input type="text" className="MaxMin" id={id} name="VRegex1" placeholder="à" value={codeBar.VRegex1} onChange={handleChange} /><br></br>
                    <label>{Regex2}</label>
                    <input type="checkbox" id={id} name="VRegex2" value= "" onChange={handleChange} /><br></br>
                    <label>{Regex3}</label>
                    <input type="checkbox" id={id} name="VRegex3" value= "" onChange={handleChange} /><br></br>
                </div>)
                })}
        </div>

)};