
interface Props {
    handleChangeNomFiche : (e:any) => void
    nomFiche : any
}





const Nom = (props: Props) => {






    return (
        <>
            <div className="ContourGroupe">
                <input type="text" className='inputgroupe' placeholder="Nom de la fiche..." value={props.nomFiche} onChange={props.handleChangeNomFiche} required />
            </div>
        </>


    )
}

export default Nom
