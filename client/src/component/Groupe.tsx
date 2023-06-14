import axios from 'axios';
import { useEffect, useState } from 'react'
import "../App.css";

interface Props {
    togm2: () => void,

  }

export default function Groupe (props: Props) {

    const handleSubmitGroupe = () => {
        props.togm2()
    }


    return (
        <div className="divcadregroupe">
            <div className="cadregroupe">
                <input type="text" className='inputgroupe' placeholder="Nom du Groupe..."></input>

                <div className="divbgroupe">
                    <button type="submit" className="buttongroupe" onClick={handleSubmitGroupe}>+</button>
                </div>
            </div>
        </div>

)};