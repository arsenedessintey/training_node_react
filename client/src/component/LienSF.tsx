
interface Props {
    allSheet:any
    handleSubmitLienSF: (e:any) => void
}





const LienSF = (props: Props) => {






    return (

        <div className="contourLienSF">
            {props.allSheet.map((allSheets:any) => (
            <div className="LienSF" onClick={props.handleSubmitLienSF}><p>{allSheets.nom}</p></div>
            ))}
        </div>

    )
}

export default LienSF