import React, { useState, useEffect } from "react";
import NewConstraint, { Constraint } from "./NewConstraint";
import axios from 'axios';
import image2 from "./croix2.webp";
import image3 from "./Modif.webp"
import image4 from "./fleche-gauche.webp"
import image5 from "./+.webp"
import image6 from "./Fgauche2.webp"
import Modal from "./Modal";

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
  // Modal Champs
  const [modalChamps, setModalChamps] = useState(false);

  // Modal Groupes
  const [modalGroupes, setModalGroupes] = useState(false);

  //Modal Contraintes
  const [modalContraintes, setModalContraintes] = useState(false);


  const [constraint, setConstraint] = useState<Constraint[]>([]);

  const emptyConstraint: Constraint =     {
    contrainte_id: -1,
    nom: "",
    type_contrainte:  'free',
    valeur_regex:"",
    Value1 : "",
    Value2 : "",
    Value3 : "",
    Value4 : "",
    Value5 : "",
    Value6 : "",
    Value7 : ""

  }

  const [selectConstraint, setSelectConstraint] = useState<Constraint>(
    emptyConstraint
  );

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
  const toggleModal = (modal: boolean, setter: (modal: boolean) => void,  constraint?: Constraint) => {
    console.log('toggle')
    
    setSelectConstraint(constraint ?? emptyConstraint);
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

  const handleSubmitGroupes = (e: any) => {
    
      e.preventDefault();
      e.taget.forEach((el: any) => {console.log('el.value :>> ', el.value);})
      const groupeCopy = [...groupes];
      groupeCopy.push({ idg: timeId, nomGroupe: nouveauGroupe, champs: []});
      setGroupe(groupeCopy);
      setNouveauGroupe("");
      toggleModal(modalGroupes, setModalGroupes, undefined)

  }

  const handleSubmitChamps = (e: any) => {
    e.preventDefault();
    toggleModal(modalChamps, setModalChamps);
    const {nameField, selectConstraint, mandatoryField } = e.target;
    console.log('nameField :>> ', nameField.value);
    console.log('selectConstraint :>> ', selectConstraint.value);
    console.log('mandatoryField :>> ', mandatoryField.checked);


  }

  const handleSubmitContraintes = (e: any) => {
    e.preventDefault();
    toggleModal(modalContraintes, setModalContraintes);

    const NewConstraint: Constraint = {
      ...selectConstraint,
      Value1: e.target[8].value,
      Value2: e.target[9].value,
      Value3: e.target[10].value,
      Value4: e.target[11].value,
      Value5: e.target[12].value,
      Value6: e.target[13].value,
      Value7: e.target[14].value,
    }

    // Choose url path to create or modify
    const urlStr = (NewConstraint.contrainte_id === -1) ? '/api/constraint' : `/api/constraint/${selectConstraint?.contrainte_id}`;
    // Choose request method to create/post or modify/put
    const request = (NewConstraint.contrainte_id === -1) ?  axios.post : axios.put;

    console.log('urlStr :>> ', urlStr);

    // Send request
    request(urlStr, NewConstraint)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //FIN GROUPE//


  return (
    <>

      {modalChamps &&
        <Modal
          toggle={() => toggleModal(modalChamps, setModalChamps)}
          handleSubmit={handleSubmitChamps}
        >
          <div>
            <input type="text" placeholder="Nom du Champ..." name="nameField"/> <br></br>

            <label>Contrainte Utilisé : </label>
            <input name="selectConstraint" type="text" value={selectConstraint?.nom} disabled /><br></br>

            <label htmlFor="mandatoryField">Champ obligatoire : </label>
            <input id="mandatoryField" name="mandatoryField" type="checkbox" className="check" />

          </div>
        </Modal>
      }

      {modalGroupes && (
        <Modal
        toggle={() => toggleModal(modalGroupes, setModalGroupes)}
        handleSubmit={handleSubmitGroupes}
        >
          <form id="formGroup" onSubmit={handleSubmitGroupes}>
            <div className="">
              <div className="">
                  <input type="text" className='inputgroupe' placeholder="Nom du Groupe..."  value={nouveauGroupe} onChange={handleChangeGroupe} />
                  <div className="divbgroupe">
                      <button form="formGroup" type="submit" className="buttongroupe">+</button>
                  </div>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {modalContraintes && ( 
        <Modal
        toggle={() => toggleModal(modalContraintes, setModalContraintes)}
        handleSubmit={handleSubmitContraintes}
        >
        <NewConstraint selectConstraint={selectConstraint} setSelectedConstraint={setSelectConstraint} const={getConstraint} />
        </Modal>
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
            <input type="image" className="plus" src={image5} onClick={() => toggleModal(modalGroupes, setModalGroupes)} />
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
                  <input type="image" className="Modif" src={image3} onClick={() => toggleModal(modalContraintes, setModalContraintes, constr) } />
                  <input type="image" className="Fgauche" src={image4} onClick={ () => { toggleModal(modalChamps, setModalChamps, constr)} } />
                  <li className="NameRegex">Nom : {constr.nom}<br></br>Regex Utilisé : {constr.valeur_regex}</li>
                </div>
              </div>
            )}
            <div className="btn_modal_center">
              <button onClick={() => toggleModal(modalContraintes, setModalContraintes)} className="btn-modal">
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