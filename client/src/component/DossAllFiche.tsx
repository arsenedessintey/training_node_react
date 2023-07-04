import { Recherches } from "./AccueilSousFiche"

interface Props {
    recherches:any
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
                    </div>
                </li>


            ))}

        </div>

    )
}

export default DossAllFiche


