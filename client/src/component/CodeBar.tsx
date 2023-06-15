import { useEffect, useState } from 'react'
import axios from 'axios';
import "../App.css";
import { kMaxLength } from 'buffer';


interface CodeBar {
    maxLenght:number
    onlyNum:boolean
    onlyLett:boolean
    minLenght:number
}
export default function CodeBar () {

    const tabCodeBar = [
        {
            id: "CodeBarid",
            maxLenght: "Intervalle de caractère max : ",
            onlyNum: "Uniquement des chiffres : ",
            onlyLett: "Uniquement des lettres : "
        }
    ]


    const [codeBar, setCodeBar] = useState<CodeBar>({

        maxLenght: 8,
        minLenght: 1,
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
        const { name, checked } = e.target;
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
                        <input type="text" className="MaxMin" id={id} name="minLenght" placeholder="de" value={codeBar.minLenght} onChange={handleChangeLenght} /><label>  à  </label>
                        <input type="text" className="MaxMin" id={id} name="maxLenght" placeholder="" value={codeBar.maxLenght} onChange={handleChangeLenght} /><br></br>
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