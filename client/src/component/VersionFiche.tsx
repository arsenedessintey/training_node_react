interface Props {
    versionFiche: any
    handleChangeVersionFiche: (e:any) => void
    nomFiche:any
    handleChangeNomFiche: (e:any) => void
    sheetId:any
    Version:any
}





const VersionFiche = (props: Props) => {






    return (

        <div className="ContourGroupe">
        <input type="text" className="inputgroupe" value={props.nomFiche} onChange={props.handleChangeNomFiche} placeholder="Nom de la Fiche" required disabled={props.sheetId !== -1}/>
        <input type="text" className='inputgroupe' placeholder="Nom de la Version..." value={props.versionFiche} onChange={props.handleChangeVersionFiche} required/>
        <p className="ErrorVersion">{props.Version}</p>
        </div>

    )
}

export default VersionFiche
