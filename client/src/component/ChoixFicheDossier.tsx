import { useSearchParams } from "react-router-dom"
import { Dossiers, Recherches } from "./AccueilSousFiche"
import { useState } from "react"
import axios from "axios"

interface Props {
    recherches: Recherches[]
    toggle:any
    idDossier:number

}

const ChoixFicheDossier = (props: Props) => {

    const [tabFicheChoix, setTabFicheChoix] = useState<Recherches[]>([])

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

    const handleSubmitFicheChoixCo =(e:any) => {
        e.preventDefault()

        axios.put(`/api/FicheChoixCo/${props.idDossier}`, {tab: tabFicheChoix})
            .then((response) => {
                console.log(response.status);
                props.toggle()
            })
            .catch((error) => {
                console.log(error);
            });

        props.toggle()


    }

    

    return (

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
            <button onClick={handleSubmitFicheChoixCo} className="ModalButton" type="button">Valider</button>
        </div>
    )
}

export default ChoixFicheDossier;


