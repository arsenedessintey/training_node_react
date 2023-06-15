import axios from 'axios';
import { useEffect, useState } from 'react'
import "../App.css";

interface Props {
    togm2: () => void,

  }

  
interface Groupe {
    nomGroupe: string
    id : number
}



export default function Groupe (props: Props) {

    const Timeid = new Date().getTime()

    //

    const [groupe, setGroupe] = useState<Groupe>({

        id: Timeid , nomGroupe: "",

      });

//

    const handleChangeGroupe = (e: any) => {

        const { name, value } = e.target;
        setGroupe((prev) => {
            return { ...prev, [name]: value };
        })
        console.log(groupe)
    };

    const handleSubmitGroupe = () => {
        props.togm2();

    }


    return (
        <div className="divcadregroupe">
            <div className="cadregroupe">
                <input type="text" className='inputgroupe' placeholder="Nom du Groupe..." name="nomGroupe" value={groupe.nomGroupe} onChange={handleChangeGroupe} />

                <div className="divbgroupe">
                    <button type="submit" className="buttongroupe" onClick={handleSubmitGroupe}>+</button>
                </div>
            </div>
        </div>

)};