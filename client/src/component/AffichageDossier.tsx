import { useSearchParams } from "react-router-dom"
import ChoixFicheDossier from "./ChoixFicheDossier"
import ModalSansValide from "./ModalSansValide"
import { useEffect, useState } from "react"
import { Dossiers } from "./AccueilSousFiche"
import axios from "axios"
import { setPath } from "../utils/utils"

interface Props {
    toggleDossier: () => void
    idDossier:number
    handleSubmitDelDossier: (idDoss:number) => void
}


const AffichageDossier = (props: Props) => {

    const [affichageFicheDossier, setAffichageFicheDossier] = useState<Dossiers>()

    
    useEffect(() => {

        getAAffichageDossier() 
        
    
      }, []);


    async function getAAffichageDossier() {
        const tmpADossier = (await axios.get(`/api/dossier/AffichageDossier/${props.idDossier}`)).data;
        setAffichageFicheDossier(tmpADossier);
  }


    return (
        <>
            <div className="cadreAffiFiche">
                <div className="affichageFicheDossier">
                    
                    {affichageFicheDossier?.sheet.map((A_sheet) => (
                        <li key={A_sheet.sheet_id}>
                            <div
                            className="nomDeFiche"
                            onClick={() => setPath("/modifySheet/" + A_sheet.sheet_id)}
                            >
                            <p className="recherchenom">{A_sheet.nom}</p>
                            <p className="recherheversion">{A_sheet.nomVersion}</p>
                            </div>
                        </li>
                    ))}

                </div>
                
            </div>
            <button className="boutonAffichageDoss" type="button" onClick={props.toggleDossier}>+</button>
            <button className="supprDoss" type="button" onClick={() => {if (window.confirm("Attention tu vas supprimer un Dossier")) {props.handleSubmitDelDossier(props.idDossier)}}}>Supprimer le Dossier</button>
        </>
        


    )
}

export default AffichageDossier