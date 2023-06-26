import React, { useState, useEffect } from "react";
import CompoContrainte from "./CompoContrainte";
import axios from "axios";

interface Props {
    setPage: (newPage: string) => void
}

interface Recherche {
    nom:string,
}

const AccueilSousFiche = (props: Props) => { 

    useEffect(() => {

        // getRecherche()
        
    
      }, []);

    const [recherche, setRecherche] = useState<Recherche[]>([
        { nom:"AAAAA" }
    ])


    async function getRecherche() {
        const tmpRecherche = (await axios.get('/api/recherche')).data;
        setRecherche(tmpRecherche);
      }

    return(

    <>
        <div className="buttonSFcenter">
            <button type="button" className="buttonSF" onClick= {() => props.setPage("/createSheet")}>CREER DES FICHES</button>
        </div>
        <div className="centerRecherche">
            <input type="text" className="Recherche" placeholder="Recherche..." />
        </div>

        <div className="CadreRecherche">
            {recherche.map((recherche) => (
                <li key={recherche.nom}>
                
                <div onClick={() => props.setPage("/modifySheet")} className="nomDeFiche"><p className="recherchenom">{recherche.nom}</p></div>

                </li>

            ))}
        </div>
    </>


    );
}
export default AccueilSousFiche