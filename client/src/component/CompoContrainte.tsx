import React, { useState, useEffect } from "react";
import NewConstraint, { Constraint } from "./NewConstraint";
import axios from 'axios';
import image3 from "./Crayon.svg"
import image4 from "./Fgauche.svg"
import image5 from "./Plus.svg"
import image6 from "./FlecheExit.svg"
import Modal from "./Modal";

interface Groupeinter {
  idg: number
  nomGroupe: string
  champs: Champ[]
}

interface Champ {
  id: number
  nom: string
  contrainte: Constraint
}

const CompoContrainte = () => {
  // Modal Champs
  const [modalChamps, setModalChamps] = useState(false);

  // Modal Groupes
  const [modalGroupes, setModalGroupes] = useState(false);

  //Modal Contraintes
  const [modalContraintes, setModalContraintes] = useState(false);


  const [constraint, setConstraint] = useState<Constraint[]>([]);

  const emptyConstraint: Constraint = {
    contrainte_id: -1,
    nom: "",
    type_contrainte: 'free',
    valeur_regex: "",
    Value1: "",
    Value2: "",
    Value3: "",
    Value4: "",
    Value5: "",
    Value6: "",
    Value7: ""

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
  const toggleModal = (modal: boolean, setter: (modal: boolean) => void, constraint?: Constraint) => {

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
    const groupeCopy = [...groupes];
    groupeCopy.push({ idg: timeId, nomGroupe: nouveauGroupe, champs: [] });
    setGroupe(groupeCopy);
    setNouveauGroupe("");
    toggleModal(modalGroupes, setModalGroupes)
  }

  const handleSubmitChamps = (e: any) => {
    e.preventDefault();
    toggleModal(modalChamps, setModalChamps);
    const { nameField, selectConstraint, mandatoryField } = e.target;
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
    const request = (NewConstraint.contrainte_id === -1) ? axios.post : axios.put;

    console.log('urlStr :>> ', urlStr);

    // Send request
    request(urlStr, NewConstraint)
      .then((response) => {
        console.log(response.status);
        getConstraint()
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
          <div className="divCreaChamps">
            <br></br>
            <input className="NomChamps" type="text" placeholder="Nom du Champ..." name="nameField" /> <br></br>
            <br></br>
            <label className="labelChoixC">Contrainte Utilisé : </label>
            <input className="NomchoixChamps" name="selectConstraint" type="text" value={selectConstraint?.nom} disabled /><br></br>

            <label className="labelValida" htmlFor="mandatoryField">Champ obligatoire : </label>
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
            <div className="ContourGroupe">
              <div className="">
                <input type="text" className='inputgroupe' placeholder="Nom du Groupe..." value={nouveauGroupe} onChange={handleChangeGroupe} />
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

      <input type="image" className="Fgauche2" src={image6} />

      <div className="felxRowConstraint">
        <div className="divChamps">

          {groupes.map((groupe) => (

            <li key={groupe.idg} className="textgroupe">

              <button type="button" className="croixgroupe" onClick={() => handleDeleteGroupe(groupe.idg)}>✖</button><span className="labelgroupe"><label>-- </label> {groupe.nomGroupe} <label>-- </label></span>

            </li>

          ))}
            <div className="groupe">
              <input type="image" className="plus" id="mandatoryGroupe" name="mandatoryGroupe" src={image5} onClick={() => toggleModal(modalGroupes, setModalGroupes)} />
              <label className="insgroupe" htmlFor="mandatoryGroupe">INSERER UN GROUPE</label>
            </div>
        </div>

        <div className="divBaccong">
          <div className="bacCong">
            <ul>
              {constraint.map(constr =>
                <div key={constr.nom} className="nnconstraint">
                  <div className="nconstraint">
                    <div className="divcroisupp"><button type="button" className="croixCont" onClick={() => { if (window.confirm("Attention tu vas supprimé une contrainte")) { handledelete(constr.contrainte_id) } }}>✖</button></div>
                    <div className="divmodif"><input type="image" className="Modif" src={image3} onClick={() => toggleModal(modalContraintes, setModalContraintes, constr)} /></div>
                    <input type="image" className="Fgauche" src={image4} onClick={() => { toggleModal(modalChamps, setModalChamps, constr) }} />
                    <div className="divNomRegex"><li className="NameRegex">Nom : {constr.nom}<br></br>Regex Utilisé : {constr.valeur_regex}</li></div>
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
      </div>
    </>
  );
}
export default CompoContrainte