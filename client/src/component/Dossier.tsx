
interface Props {
    handleChangeDossier : (e:any) => void
    nouveauDossier:any
}





const Dossier = (props: Props) => {






    return (

        <div className="ContourGroupe">
        <input type="text" className='inputgroupe' placeholder="Nom du Dossier..." value={props.nouveauDossier} onChange={props.handleChangeDossier} required/>
        </div>

    )
}

export default Dossier