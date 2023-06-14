import { useEffect, useState } from 'react'
import axios from 'axios';
import "../App.css";
import { kMaxLength } from 'buffer';


interface CodeBar {
    maxLenght:number
    onlyNum:boolean
    onlyLett:boolean
}
export default function CodeBar () {

    const tabCodeBar = [
        {
            id: "CodeBarid",
            maxLenght: "Nombre de caractère max : ",
            onlyNum: "Uniquement des chiffres : ",
            onlyLett: "Uniquement des lettres : "
        }
    ]


    const [codeBar, setCodeBar] = useState<CodeBar>({

        maxLenght: 8,
        onlyLett: false,
        onlyNum: false

      });

    const handleChangeLenght = (e: any) => {

        const { name, value } = e.target;
        setCodeBar((prev) => {
            return { ...prev, [name]: value };
        })
    };

    const handleChange = (e: any) => {
        console.log(e.target)
        const { name, checked } = e.target;
        console.log("checked", checked)
        setCodeBar((prev) => {
            return { ...prev, [name]: checked };
        
        })
    };


    return (
        <div>
            <div className="divRegex">
                {tabCodeBar.map(({ id, maxLenght, onlyNum, onlyLett }) => {
                    return (<div key={id} >
                        <label>{maxLenght}</label>
                        <input type="text" className="MaxMin" id={id} name="maxLenght" placeholder="de" value={codeBar.maxLenght} onChange={handleChangeLenght} /><br></br>
                        {/* <input type="text" className="MaxMin" id={id} name="VRegex1" placeholder="à" value={codeBar.maxLength} onChange={handleChange} /> */}
                        <label>{onlyNum}</label>
                        <input type="checkbox" id={id} name="onlyNum" value={codeBar.onlyNum.toString()} onChange={handleChange} /><br></br>
                        <label>{onlyLett}</label>
                        <input type="checkbox" id={id} name="onlyLett" value={codeBar.onlyLett.toString()} onChange={handleChange}  /><br></br>
                        <input value="" style={{display:"none"}}></input>
                        <input value="" style={{display:"none"}}></input>
                        <input value="" style={{display:"none"}}></input>
                    </div>)
                    })}
            </div>
        </div>

)};