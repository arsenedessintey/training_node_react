import { useEffect, useState } from 'react'
import axios from 'axios';

interface Props2 {

}

export default function CodeBar (props: Props2) {

    const tabCodeBar = [
        {
            id: "CodeBarid",
            Regex1: "Nombre de caractère max : ",
            Regex2: "Nombre de chiffre max : ", 
            Regex3: "Nombre de lettre max : ", 
            Regex4: "Uniquement des chiffres : ",
            Regex5: "Uniquement des lettres : "
        }

        // { 
        //     value: {props.value}, 
        //     id : "Dateid",
        //     Regex1: "Format AAAA/MM :",
        //     Regex2: "Format AAAA/MM/DD :",
        // },
        // { 
        //     value: {props.value},
        //     id : "Listeid",
        //     Regex1: "Liste de mot  à définir (avec un | entre chaque mot) :",      
        // },

    ]

    const [codeBar, setCodeBar] = useState({

        VRegex1: "",
        VRegex2: "",
        VRegex3: "",
        VRegex4: "",
        VRegex5: ""

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCodeBar((prev) => {
            return { ...prev, [name]: value };
        })
    };

    return (

        <div>
            {tabCodeBar.map(({ id, Regex1, Regex2, Regex3, Regex4, Regex5 }) => {
                return (<div key={id} >
                    <label>{Regex1}</label>
                    <input type="text" id={id} name="VRegex1" value={codeBar.VRegex1} onChange={handleChange} /><br></br>
                    <label>{Regex2}</label>
                    <input type="text" id={id} name="VRegex2" value={codeBar.VRegex2} onChange={handleChange} /><br></br>
                    <label>{Regex3}</label>
                    <input type="text" id={id} name="VRegex3" value={codeBar.VRegex3} onChange={handleChange} /><br></br>
                    <label>{Regex4}</label>
                    <input type="text" id={id} name="VRegex4" value={codeBar.VRegex4} onChange={handleChange} />
                    <label>{Regex5}</label>
                    <input type="text" id={id} name="VRegex5" value={codeBar.VRegex5} onChange={handleChange} />
                </div>)
                })}
        </div>

)};