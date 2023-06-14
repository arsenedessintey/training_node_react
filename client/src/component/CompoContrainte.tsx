import React, { useState, useEffect } from "react";
import NewConstraint, { Constraint } from "./NewConstraint";
import axios from 'axios';
import image2 from "./croix2.webp";
import image3 from "./Modif.webp"
import image4 from "./fleche-gauche.webp"
import image5 from "./+.webp"
import image6 from "./Fgauche2.webp"
import Groupe from "./Groupe";



const CompoContrainte = () => {
  // Modal Contrainte
  const [modal, setModal] = useState(false);

  //Modal Groupe
  const [modal2, setModal2] = useState(false);


  const [constraint, setConstraint] = useState<Constraint[]>([]);

  const [selectConstraint, setSelectConstraint] = useState<Constraint | undefined>(undefined);

  useEffect(() => {

    getConstraint()

  }, []);

  async function getConstraint() {
    const tmpConstraint: Constraint[] = (await axios.get('/api/tabCon')).data;
    setConstraint(tmpConstraint);
  }

//Modal Contrainte
  const toggleModal = (constraint: Constraint | undefined) => {
    setSelectConstraint(constraint);
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

//Modal Groupe

  const toggleModal2 = (constraint: Constraint | undefined) => {
    setSelectConstraint(constraint);
    setModal2(!modal2);
  };

  if (modal2) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }



  const handledelete = (id: any) => {

    axios.delete(`/api/constraint/${id}`)
      .then((response) => {
        console.log(response.status);
        getConstraint();

      })
      .catch((error) => {
        console.log(error);
      });

  }

  return (
    <>
      {modal && (
        <NewConstraint togM={() => toggleModal(undefined)} selectConstraint={selectConstraint} const={getConstraint} />

      )}

      {modal2 && (
        <Groupe togm2={() => toggleModal2(undefined)}/>

      )}

      <div className="divexit">
        <input type="image" className="Fgauche2" src={image6} />
      </div>
      <div className="divfiche">
        <div className="divgroupe">
          <div className="groupe">
            <input type="image" className="plus" src={image5} onClick={() => {toggleModal2(undefined)}} />
            <p>INSERER UN GROUPE</p>
          </div>
        </div>
      </div>
      <div className="divBaccong">
        <div className="bacCong">
          <ul>
            {constraint.map(constr =>
              <div className="nnconstraint">
                <div className="nconstraint">
                  <input type="image" className="croix2" src={image2} onClick={() => { if (window.confirm("Attention tu vas supprimé une contrainte")) { handledelete(constr.contrainte_id) } }} />
                  <input type="image" className="Modif" src={image3} onClick={() => { toggleModal(constr) }} />
                  <input type="image" className="Fgauche" src={image4} />
                  <li className="NameRegex">Nom : {constr.nom}<br></br>Regex Utilisé : {constr.valeur_regex}</li>
                </div>
              </div>
            )}
            <div className="btn_modal_center">
              <button onClick={() => toggleModal(undefined)} className="btn-modal">
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