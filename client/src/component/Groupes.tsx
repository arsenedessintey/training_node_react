
interface Props {
    nouveauGroupe: any
    handleChangeGroupe: (e:any) => void
}





const Groupes = (props: Props) => {






    return (

        <div className="ContourGroupe">
        <input type="text" className='inputgroupe' placeholder="Nom du Groupe..." value={props.nouveauGroupe} onChange={props.handleChangeGroupe} />
        </div>

    )
}

export default Groupes


