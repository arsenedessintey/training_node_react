import { Sheet } from "./CompoContrainte"

interface Props {
    nouveauChamps: any
    selectConstraint: any
    handleChangeChamps: (e:any) => void
    mandatoryField: any
    handleChangeReq: (e:any) => void
    explicationS:any
    handleChangeTextAreaChamps : (e:any) => void
    allSheetSlect:any
    handleChangeSelect : (e:any) => void

}





const Champs = (props: Props) => {







    return (
        <>
            <div className="divCreaChamps">
                <br></br>
                <input className="NomChamps" type="text" placeholder="Nom du Champ..." name="nameField" value={props.nouveauChamps} onChange={props.handleChangeChamps} required/> <br></br>
                <br></br>
                <div>

                    {
                    props.selectConstraint?.type_contrainte === "link" ?
                    <span>

                        <label className="labelChoixC"> Choisir un lien :</label>
                        <select className="SelectChamps" onChange={props.handleChangeSelect} required multiple>
                            {props.allSheetSlect.map((sheet:Sheet) => (
                                <option key={sheet.sheet_id} value={sheet.sheet_id}>{sheet.sheet_id}</option>
                                
                            ))}
                            
                        </select>
                        

                    </span>
                    : 
                    <label></label>
                    } 
                </div>
                <br></br>
                <textarea className="TextAreaChamp" placeholder="Explication..." value={props.explicationS} onChange={props.handleChangeTextAreaChamps}/><br></br>
                <label className="labelChoixC">Contrainte Utilisé : </label>
                <input className="NomchoixChamps" name="selectConstraint" type="text" value={props.selectConstraint?.nom} disabled /><br></br>

                <label className="labelValida" htmlFor="mandatoryField">Champ obligatoire : </label>
                <input id="mandatoryField" name="mandatoryField" type="checkbox" className="check" checked={props.mandatoryField} onChange={props.handleChangeReq}/>
            </div>
        </>


    )
}

export default Champs