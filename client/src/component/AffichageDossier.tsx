import ChoixFicheDossier from "./ChoixFicheDossier"
import ModalSansValide from "./ModalSansValide"

interface Props {
    toggleDossier: () => void
}





const AffichageDossier = (props: Props) => {

    return (
        <>
        
            <div className="cadreChoixFiche">
                <button className="boutonAffichageDoss" type="button" onClick={props.toggleDossier}>+</button>
            </div>
        </>
        


    )
}

export default AffichageDossier