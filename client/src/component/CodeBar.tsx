import { useEffect, useState } from 'react'
import axios from 'axios';
import "../App.css";

export default function CodeBar () {

    const tabCodeBar = [
        {
            id: "CodeBarid",
            maxLength: "Nombre de caractère max : ",
            onlyNum: "Uniquement des chiffres : ",
            onlyLett: "Uniquement des lettres : "
        }
    ]

    const [codeBar, setCodeBar] = useState({

        maxLength: undefined,
        onlyNum: "false",
        onlyLett: "false"

      })

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setCodeBar((prev) => {
            return { ...prev, onlyNum: "false", onlyLett: "false" };
        })
        const { name, value } = e.target;
        setCodeBar((prev) => {
            return { ...prev, [name]: value };
        })
    };

    const Sub = () => {
        
        axios.post(`/api/regex`, codeBar)
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
                {tabCodeBar.map(({ id, maxLength, onlyNum, onlyLett }) => {
                    return (<div key={id} >
                        <label>{maxLength}</label>
                        <input type="text" className="MaxMin" id={id} name="maxLength" placeholder="de" value={codeBar.maxLength} onChange={handleChange} /><br></br>
                        {/* <input type="text" className="MaxMin" id={id} name="VRegex1" placeholder="à" value={codeBar.maxLength} onChange={handleChange} /> */}
                        <label>{onlyNum}</label>
                        <input type="checkbox" id={id} name="onlyNum" value= "true" onChange={handleChange} /><br></br>
                        <label>{onlyLett}</label>
                        <input type="checkbox" id={id} name="onlyLett" value= "true" onChange={handleChange} /><br></br>
                    </div>)
                    })}
            </div>
            <div className="cntbuttonRegex">
                    <button className="buttonRegex" onClick={Sub}>Validé</button>
            </div>
        </div>

)};