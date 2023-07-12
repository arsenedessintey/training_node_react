import { useSearchParams } from "react-router-dom"
import { Dossiers, Recherches } from "./AccueilSousFiche"
import { useEffect, useState } from "react"
import axios from "axios"

interface Props {
    recherches: Recherches[]
    toggle:any
    idDossier:number

}

const ChoixFicheDossier = (props: Props) => {

    const [tabFicheChoix, setTabFicheChoix] = useState<Recherches[]>([])

    useEffect(() => {

        getAAffichageDossier() 
        
    
      }, []);

    const handleSubmitChoixFicheClick = (fiche: Recherches) => {
        const tabFicheChoixCopy = [...tabFicheChoix];

        // chercher si la fiche est deja presente
        const idx = tabFicheChoixCopy.findIndex(f => f.sheet_id === fiche.sheet_id);

        // Ajout si pas present
        if (idx === -1) {
            tabFicheChoixCopy.push(fiche);
        } else {
            // enlever si exist
            tabFicheChoixCopy.splice(idx, 1);
        }
        setTabFicheChoix(tabFicheChoixCopy);
    }

    function isSelected(recherche: Recherches) {
        const idst = tabFicheChoix.findIndex(f => f.sheet_id === recherche.sheet_id);
        return (idst === -1) ? "nomDeFiche" : "nomDeFiche2";
    }

    const handleSubmitFicheChoixCo =() => {

        axios.put(`/api/dossier/FicheChoixDisco/${props.idDossier}`,{sheet: props.recherches})
        .then((response) => {
            console.log(response.status);
            connectSheetDossier()
        })
        .catch((error) => {
            console.log(error);
        });

    }

    const connectSheetDossier = () => {

        axios.put(`/api/dossier/FicheChoixCo/${props.idDossier}`, {tab: tabFicheChoix})
        .then((response) => {
            console.log(response.status);
            props.toggle()
            window.history.go(0)
        })
        .catch((error) => {
            console.log(error);
        });

    }


    async function getAAffichageDossier() {
        const tmpADossier: Dossiers = (await axios.get(`/api/dossier/AffichageDossier/${props.idDossier}`)).data;

        const tabsheetdoss = tmpADossier.sheet

        setTabFicheChoix(tabsheetdoss);
  }


    

    return (
        <>
            <div className="cadreChoixFiche">
                {props.recherches.map((recherche: Recherches) => (
                    <li key={recherche.sheet_id}>
                        <div
                            onClick={() => handleSubmitChoixFicheClick(recherche)}
                            className={isSelected(recherche)}
                        >
                            <p className="recherchenom">{recherche.nom}</p>
                            <p className="recherheversion">{recherche.nomVersion}</p>
                        </div>
                    </li>

                ))}
            </div>
            <button onClick={handleSubmitFicheChoixCo} className="ModalButton" type="button">Valider</button>
        </>
        
    )
}

export default ChoixFicheDossier;


