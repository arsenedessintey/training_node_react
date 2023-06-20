import React, { useState, useEffect } from "react";
import NewConstraint, { Constraint } from "./NewConstraint";
import axios from 'axios';
import image3 from "./Crayon.svg"
import image4 from "./Fgauche.svg"
import image5 from "./Plus.svg"
import image6 from "./FlecheExit.svg"
import Modal from "./Modal";
import image7 from "./Monter.svg"
import image8 from "./Descente.svg"
import { groupCollapsed } from "console";

interface Groupeinter {
  idg: number
  nomGroupe: string
  champs: Champ[]
}

interface Champ {
  idc: number
  nomChamps: string
  contrainteChamps: Constraint
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
  const [selectedGroupe, setSelectedGroupe] = useState<string>("");

  const [selectedChampId, setSelectedChampId] = useState<number>(-1);

  useEffect(() => {

    getConstraint()
    

  }, []);

  //GROUPE STATE

  const timeId = new Date().getTime()

  //

  const [groupes, setGroupe] = useState<Groupeinter[]>([
    {idg: timeId , nomGroupe: "Default" , champs:[]}
  ]);

  const [nouveauGroupe, setNouveauGroupe] = useState("");

  const [nouveauChamps, setNouveauChamps] = useState("")

  //FIN GROUPE STATE

  async function getConstraint() {
    const tmpConstraint: Constraint[] = (await axios.get('/api/tabCon')).data;
    setConstraint(tmpConstraint);
  }

  const changeGroupe = (groupes: string) => {
    toggleModal(modalGroupes, setModalGroupes)
    setSelectedGroupe(groupes);
  }

  const changeChamp = (champs: Champ) => {
    toggleModal(modalChamps, setModalChamps)
    setSelectedChampId(champs.idc);
    setSelectConstraint(champs.contrainteChamps)
  }
  //Modal Contrainte
  const toggleModal = (modal: boolean, setter: (modal: boolean) => void, constraint?: Constraint) => {

      setSelectConstraint(constraint ?? emptyConstraint);
      setNouveauGroupe("")
      setSelectedGroupe("")
      setNouveauChamps("")
      setSelectedChampId(-1)
    
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

  const handleDeleteChamps = (idc : number) => {
    const groupeCopy = [...groupes];
    console.log('efzefezfcez :>> ', idc);

    for(let i = 0; i < groupeCopy.length ; i++){
      const indexChamp = groupeCopy[i].champs.findIndex(champ => {
        console.log('champ.idc :>> ', champ.idc);
        return champ.idc === idc
      } );
      console.log('index :>> ', indexChamp);
      if (indexChamp !== -1){
        groupeCopy[i].champs.splice(indexChamp, 1);
        setGroupe(groupeCopy);
      }
   }
  }


  const handleChangeGroupe = (e: any) => {

    const valueAfterGroupe = e.target.value;
    setNouveauGroupe(valueAfterGroupe);

  };

  const handleChangeChamps = (e:any) => {

    const valueAfterChamps = e.target.value;
    setNouveauChamps(valueAfterChamps);

  }

  const handleSubmitGroupes = (e: any) => {
    e.preventDefault();

    const groupeCopy = [...groupes];

    const groupeFound = groupeCopy.find(groupe => groupe.nomGroupe === selectedGroupe);

    // Modify the groupe
    if(groupeFound !== undefined){
      groupeFound.nomGroupe = nouveauGroupe;
    }
    // Add new groupe
    else{
      groupeCopy.push({ idg: timeId, nomGroupe: nouveauGroupe, champs: [] });
    }

    // save changes
    setGroupe(groupeCopy);
    setNouveauGroupe("");
    setSelectedGroupe("")
    toggleModal(modalGroupes, setModalGroupes)
  }

  const handleSubmitChamps = (e: any) => {
    e.preventDefault();

    const groupeCopy = [...groupes];
    let index = -1
      for(let i = 0; i < groupeCopy.length ; i++){
        index = groupeCopy[i].champs.findIndex(champ => champ.idc === selectedChampId);
    // Modify champ
        if(index !== -1) {
          const tmpChamps = groupeCopy[i].champs[index];
          tmpChamps.nomChamps = nouveauChamps;
          break
        }
     }
    // Add new champs

    if(index === -1){
      groupeCopy[groupeCopy.length - 1].champs.push({ idc: timeId, nomChamps: nouveauChamps, contrainteChamps: selectConstraint });
    }

    // save changes
    setGroupe(groupeCopy);
    setNouveauChamps("");
    setSelectedChampId(-1)
    toggleModal(modalChamps, setModalChamps)
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
            <input className="NomChamps" type="text" placeholder="Nom du Champ..." name="nameField" value={nouveauChamps} onChange={handleChangeChamps}/> <br></br>
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
          <div className="ContourGroupe">
            <input type="text" className='inputgroupe' placeholder="Nom du Groupe..." value={nouveauGroupe} onChange={handleChangeGroupe} />
          </div>
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
            <ul>
              <li key={groupe.idg} className="textgroupe">

                <button type="button" className="croixgroupe" onClick={() => handleDeleteGroupe(groupe.idg)}>✖</button><span 
                onDoubleClick={() => changeGroupe(groupe.nomGroupe)} 
                className="labelgroupe">
                <label>- </label> {groupe.nomGroupe} <label>- </label></span>

              </li>
              
              <li>

                  {groupe.champs.map((champ) => (

                    <>
                    <input type="image" className="Descente" src={image8}/>
                    <input type="image" className="Monter" src={image7}/>
                    <input type="image" className="Modif" src={image3} onClick={() => changeChamp(champ)} />
                    <button type="button" className="croixgroupe" onClick={() => handleDeleteChamps(champ.idc)}>✖</button>
                    <input value={champ.nomChamps} disabled />
                    <input value={champ.contrainteChamps.nom} disabled /></>
                  ))}

              </li>
            </ul>        

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