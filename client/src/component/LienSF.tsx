import { ChildSheet, Sheet } from "./CompoContrainte"

interface Props {
    allSheet:any
    handleSubmitLienSF: (childSheet: ChildSheet) => void
}



const LienSF = (props: Props) => {






    return (

        <div className="contourLienSF">
            {props.allSheet.map((allSheets: ChildSheet) => (
                <div key={allSheets.sheet_id} className="LienSF" onClick={() => props.handleSubmitLienSF(allSheets)}><p>{allSheets.nom}</p></div>
            ))}
        </div>

    )
}

export default LienSF