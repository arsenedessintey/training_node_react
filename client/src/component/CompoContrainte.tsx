import React, { useState, useEffect } from "react";
import NewConstraint, { Constraint } from "./NewConstraint";
import axios from 'axios';
import image2 from "./croix2.webp";
import image3 from "./Modif.webp"
import image4 from "./fleche-gauche.webp"
import image5 from "./+.webp"
import image6 from "./Fgauche2.webp"

interface Groupeinter {
  idg: number
  nomGroupe: string
  champs:Champ[]
}

interface Champ{
  id: number
  nom:string
  contrainte:Constraint
}

const CompoContrainte = () => {
  // Modal Contrainte
  const [modal1, setModal1] = useState(false);

  //Modal Groupe
  const [modal2, setModal2] = useState(false);

  //Modal Champ
  const [modal3, setModal3] = useState(false);


  const [constraint, setConstraint] = useState<Constraint[]>([]);

  const [selectConstraint, setSelectConstraint] = useState<Constraint | undefined>(undefined);

  useEffect(() => {

    getConstraint()

  }, []);

  //GROUPE STATE

  const timeId = new Date().getTime()

  //

  const [groupes, setGroupe] = useState<Groupeinter[]>([]);

  const [nouveauGroupe, setNouveauGroupe] = useState("");

  //FIN GROUPE STATE

  async function getConstraint() {
    const tmpConstraint: Constraint[] = (await axios.get('/api/tabCon')).data;
    setConstraint(tmpConstraint);
  }


//Modal Contrainte
  const toggleModal = (modal: boolean, setter: (modal: boolean) => void,  constraint: Constraint | undefined) => {
    setSelectConstraint(constraint);
    setter(!modal);
  };

  const handledelete = (id: number) => {

    axios.delete(`/api/constraint/${id}`)
      .then((response) => {
        console.log(response.status);
        getConstraint();

      })
      .catch((error) => {
        console.log(error);
      });

  }

  //GROUPE//

    const handleDeleteGroupe = (idg: number) => {
      const groupeCopy = [...groupes];
      const groupeUpt = groupeCopy.filter((groupee) => groupee.idg !== idg);
      setGroupe(groupeUpt);
  }


  const handleChangeGroupe = (e: any) => {

      const valueAfter = e.target.value;
      setNouveauGroupe(valueAfter);

  };

  const handleSubmitGroupe = (e: any) => {

      e.preventDefault();
      const groupeCopy = [...groupes];
      groupeCopy.push({ idg: timeId, nomGroupe: nouveauGroupe, champs: []});
      setGroupe(groupeCopy);
      setNouveauGroupe("");
      toggleModal(modal2, setModal2, undefined)

  }



  //FIN GROUPE//


  return (
    <>
      {modal1 && (
        <NewConstraint togM={() => toggleModal(modal1, setModal1, undefined)} selectConstraint={selectConstraint} const={getConstraint} />

      )}

      {modal2 && (

        <div className="divcadregroupe">
            <div className="cadregroupe">
                <input type="text" className='inputgroupe' placeholder="Nom du Groupe..."  value={nouveauGroupe} onChange={handleChangeGroupe} />
                <div className="divbgroupe">
                    <button type="submit" className="buttongroupe" onClick={handleSubmitGroupe}>+</button>
                </div>
            </div>
        </div>

      )}

      {modal3 && (

        <div className="divcadrechamps">
          <div className="cadrechamps">
            <input type="text" className="inputchamps" placeholder="Nom du Champ..." value={""} /><br></br>
            <label className="textconstr">Contrainte Utilisé : </label><input className="nomConstr" value={selectConstraint?.nom} disabled/><br></br>
            <label className="textconstr2">Champ obligatoire : </label><input type="checkbox" className="check"/>
            <div className="divchamps">
                    {/* <button type="submit" className="buttonchamps" onClick={handleSubmitChamps}>Validé</button> */}
            </div>
          </div>
        </div>

      )}

      <div className="divexit">
        <input type="image" className="Fgauche2" src={image6} />
      </div>
      <div className="divfiche">

        {groupes.map((groupe) => (

          <li key={groupe.idg} className="textgroupe">

          <input type="image" className="croix2groupe" src={image2} onClick={() => handleDeleteGroupe(groupe.idg)}/><label>-- </label> {groupe.nomGroupe} <label>-- </label>

          </li>

        ))}


        <div className="divgroupe">
          <div className="groupe">
            <input type="image" className="plus" src={image5} onClick={() => {toggleModal(modal2, setModal2, undefined)}} />
            <p>INSERER UN GROUPE</p>
          </div>
        </div>
      </div>
      <div className="divBaccong">
        <div className="bacCong">
          <ul>
            {constraint.map(constr =>
              <div key={constr.nom} className="nnconstraint">
                <div className="nconstraint">
                  <input type="image" className="croix2" src={image2} onClick={() => { if (window.confirm("Attention tu vas supprimé une contrainte")) { handledelete(constr.contrainte_id) } }} />
                  <input type="image" className="Modif" src={image3} onClick={() => { toggleModal(modal1, setModal1, constr) }} />
                  <input type="image" className="Fgauche" src={image4} onClick={ () => { toggleModal(modal3, setModal3, constr)} } />
                  <li className="NameRegex">Nom : {constr.nom}<br></br>Regex Utilisé : {constr.valeur_regex}</li>
                </div>
              </div>
            )}
            <div className="btn_modal_center">
              <button onClick={() => toggleModal(modal1, setModal1, undefined)} className="btn-modal">
                +
              </button>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
export default CompoContrainte