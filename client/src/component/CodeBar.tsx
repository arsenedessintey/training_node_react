import { useEffect, useState } from 'react'
import axios from 'axios';

export default function CodeBar () {

    const tabCodeBar = [
        {
            id: "CodeBarid",
            maxLength: "Nombre de caractère max : ",
            onlyNum: "Uniquement des chiffres : ",
            Regex3: "Uniquement des lettres : "
        }
    ]

    const [codeBar, setCodeBar] = useState({

        maxLength: "",
        onlyNum: "",
        onlyLett: ""

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCodeBar((prev) => {
            return { ...prev, [name]: value };
        })
    };

    return (

        <div>
            {tabCodeBar.map(({ id, maxLength, onlyNum, onlyLett }) => {
                return (<div key={id} >
                    <label>{maxLength}</label>
                    <input type="text" className="MaxMin" id={id} name="VRegex1" placeholder="de" value={codeBar.maxLength} onChange={handleChange} /><br></br>
                    {/* <input type="text" className="MaxMin" id={id} name="VRegex1" placeholder="à" value={codeBar.maxLength} onChange={handleChange} /> */}
                    <label>{onlyNum}</label>
                    <input type="checkbox" id={id} name="VRegex2" value= "" onChange={handleChange} /><br></br>
                    <label>{onlyLett}</label>
                    <input type="checkbox" id={id} name="VRegex3" value= "" onChange={handleChange} /><br></br>
                </div>)
                })}
        </div>

)};