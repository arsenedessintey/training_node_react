import { Recherches } from "./AccueilSousFiche"

interface Props {
    recherches:any
    handleSubmitDesacSheet: (id:number) => void
}





const DossAllFiche = (props: Props) => {






    return (

        <div className="ContourDossAllFiche">
            {props.recherches.map((rech:Recherches)=>(
                <li key={rech.sheet_id}>
                    <div
                    className="nomDeFiche"
                    >
                    <a className="Soulignement" href={"/modifySheet/" + rech.sheet_id} target='_blank'>
                    <p className="recherchenom">{rech.nom}</p>
                    <p className="recherheversion">{rech.nomVersion}</p>
                    </a>
                    <button type="button" className="Button_desacSheet" onClick={() => { if (window.confirm("Attention tu vas supprimer une Fiche")) {props.handleSubmitDesacSheet(rech.sheet_id)}}}>✖</button>
                    </div>
                </li>


            ))}

        </div>

    )
}

export default DossAllFiche


