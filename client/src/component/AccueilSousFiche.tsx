import React, { useState, useEffect } from "react";
import CompoContrainte from "./CompoContrainte";
import axios from "axios";

interface Recherche {
    nom:string,
}

const AccueilSousFiche = () => { 

    useEffect(() => {

        // getRecherche()
        
    
      }, []);

    const [modalSousFiche, setModalSousFiche] = useState(false);

    const toggleModalSousFiche = () => {
        setModalSousFiche(!modalSousFiche)
    }

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
        <button type="button" className="buttonSF" onClick= {toggleModalSousFiche}>CREER DES FICHES</button>
    </div>
    <div className="centerRecherche">
        <input type="text" className="Recherche" placeholder="Recherche..." />
    </div>

    <div className="CadreRecherche">
        {recherche.map((recherche) => (
            <li key={recherche.nom}>
            
            <div className="nomDeFiche"><p className="recherchenom">{recherche.nom}</p></div>

            </li>

        ))}
    </div>

    {modalSousFiche && 

    <CompoContrainte toggleSF={toggleModalSousFiche}/>
    
    
    
    }
    
    
    
    </>


    );
}
export default AccueilSousFiche