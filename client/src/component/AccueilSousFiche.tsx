import React, { useState, useEffect } from "react";
import CompoContrainte from "./CompoContrainte";
import axios from "axios";

interface Props {
    setPage: (newPage: string) => void
}

interface Recherches {
    sheet_id:number
    nom:string
}

const AccueilSousFiche = (props: Props) => { 

    useEffect(() => {

        getRecherche()
        
    
      }, []);

    const [recherches, setRecherches] = useState<Recherches[]>([])


    async function getRecherche() {
        const tmpRecherche = (await axios.get('/api/recherche')).data;
        setRecherches(tmpRecherche);
      }

    return(

    <>


        <div className="CentereRecherche">
            <div className=" CadreRecherche">

                    {recherches.map((recherche) => (
                        <li key={recherche.nom}>
                        
                        <div onClick={() => props.setPage("/modifySheet/" + recherche.sheet_id )} className="nomDeFiche"><p className="recherchenom">{recherche.nom}</p></div>

                        </li>

                    ))}
                </div>
                


                <button type="button" className="buttonSF" onClick= {() => props.setPage("/createSheet")}>CREER DES FICHES</button>

        </div>
        
    </>


    );
}
export default AccueilSousFiche