import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewConstraint, { Constraint } from "./NewConstraint";
import axios from 'axios';
import image3 from "./Crayon.svg"
import image4 from "./Fgauche.svg"
import image5 from "./Plus.svg"
import image6 from "./FlecheExit.svg"
import Modal from "./Modal";
import image7 from "./Monter.svg"
import image8 from "./Descente.svg"
import { swipeArrayElem, swipeArrayElemGroupe } from "../utils/utils";
import { json } from "stream/consumers";

interface PropsCC {
  setPage: (newPage: string) => void
}

export type Sheet = {
  sheet_id: number
  nom: string
  description: string | null,
  groupe: Groupeinter[]
}

interface Groupeinter {
  groupe_id: number
  nom: string
  champs: Champ[]
}

interface Champ {
  field_id: number
  nom: string
  constraint: Constraint
  require:boolean
}

const CompoContrainte = (PropsCC: PropsCC) => {
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

    getSheet()

  }, []);

  //GROUPE STATE

  const timeId = new Date().getTime()

  //

  const [groupes, setGroupe] = useState<Groupeinter[]>([
    {groupe_id: timeId , nom: "Default" , champs:[]}
  ]);

  const [nouveauGroupe, setNouveauGroupe] = useState("");

  const [nouveauChamps, setNouveauChamps] = useState("")

  const [mandatoryField, setMandatoryField] = useState(false);

  const [nomFiche, setNomFiche] = useState("")

  const [descFiche,setDescFiche] = useState("")

  //FIN GROUPE STATE

  async function getConstraint() {
    const tmpConstraint: Constraint[] = (await axios.get('/api/tabCon')).data;
    setConstraint(tmpConstraint);
  }

  async function getSheet(){

    if(window.location.toString().includes('/modifySheet') ) {

      const pathArray = window.location.pathname.toString().split("/")

      const sheet_id = pathArray[pathArray.length-1]

      const sheetSch: Sheet = JSON.parse((await axios.get(`/api/modifyS/${sheet_id}`)).data)
      

      console.log('sheet.sheet_id :>> ', sheetSch.groupe[0].champs);

            
      // champ.contrainteChamps.nom
      const test = sheetSch.groupe[0]
      console.log('test :>> ', test);

      const newGroupe = sheetSch.groupe

      setGroupe(newGroupe)
      setNomFiche(sheetSch.nom);
      setDescFiche(sheetSch.description ?? "");

  }
}

  const changeGroupe = (groupes: string) => {
    toggleModal(modalGroupes, setModalGroupes)
    setSelectedGroupe(groupes);
  }

  const changeChamp = (champs: Champ) => {
    toggleModal(modalChamps, setModalChamps)
    setSelectedChampId(champs.field_id);
    setSelectConstraint(champs.constraint)
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
    const groupeUpt = groupeCopy.filter((groupee) => groupee.groupe_id !== idg);
    setGroupe(groupeUpt);
  }

  const handleDeleteChamps = (idc : number) => {
    const groupeCopy = [...groupes];
    console.log('efzefezfcez :>> ', idc);

    for(let i = 0; i < groupeCopy.length ; i++){
      const indexChamp = groupeCopy[i].champs.findIndex(champ => {
        return champ.field_id === idc
      } );
      console.log('index :>> ', indexChamp);
      if (indexChamp !== -1){
        groupeCopy[i].champs.splice(indexChamp, 1);
        setGroupe(groupeCopy);
      }
   }
  }

  const handleChampsMove = (moveChamp: Champ, travel: -1 | 1) => {

    const groupeCopy = [...groupes];

    let indexChampClick = -1;

    for (let i = 0; i < groupeCopy.length; i++) {

      indexChampClick = groupeCopy[i].champs.findIndex(champ => champ.field_id === moveChamp.field_id);
      // champs not found
      if (indexChampClick === -1) {
        continue;
      }

      const arrayLimit = (travel !== 1) ? 0 : groupeCopy[i].champs.length - 1;
      // champs swipe inside groupe
      if (indexChampClick !== arrayLimit) {
        swipeArrayElem(groupeCopy[i].champs, indexChampClick, indexChampClick + travel);
        break
      }
      // champs change groupe 
      else if (indexChampClick === arrayLimit && groupeCopy[i + travel]) {

        const champtempo = groupeCopy[i].champs[indexChampClick]

        groupeCopy[i].champs.splice(indexChampClick, 1);
        // move down
        if (travel !== 1) {
          groupeCopy[i + travel].champs.push(champtempo)
        }
        // move up
        else {
          groupeCopy[i + travel].champs.unshift(champtempo)
        }

        break

      }
    }

    setGroupe(groupeCopy);
  }

  const handleGroupeUpDown = (moveGroupe: Groupeinter, travel: -1 | 1) => {

    const groupeCopy = [...groupes];

    let indexGroupeClick = -1;

    for (let i = 0; i < groupeCopy.length; i++) {

      indexGroupeClick = groupeCopy.findIndex(groupe => groupe.groupe_id === moveGroupe.groupe_id);
      const arrayLimit = (travel!== 1) ? 0 : groupeCopy.length - 1;

      if (indexGroupeClick !== -1 && indexGroupeClick !== arrayLimit) {
        swipeArrayElemGroupe(groupeCopy, indexGroupeClick, indexGroupeClick + travel);
        break
      }
    }

    setGroupe(groupeCopy);

  }
    
  const handleChangeGroupe = (e: any) => {

    const valueAfterGroupe = e.target.value;
    setNouveauGroupe(valueAfterGroupe);

  };

  const handleChangeChamps = (e:any) => {

    const valueAfterChamps = e.target.value;
    setNouveauChamps(valueAfterChamps);

  }

  const handleChangeReq = (e:any) => {
    const { checked } = e.target;
    setMandatoryField(checked);
  }

  const handleChangeNomFiche = (e:any) => {
    const valueAfterNomFiche = e.target.value;
    setNomFiche(valueAfterNomFiche);
  }

  const handleChangeDescFiche = (e:any) => {
    const valueAfterDescFiche = e.target.value;
    setDescFiche(valueAfterDescFiche);
  }

  const handleSubmitGroupes = (e: any) => {
    e.preventDefault();

    const groupeCopy = [...groupes];

    const groupeFound = groupeCopy.find(groupe => groupe.nom === selectedGroupe);

    // Modify the groupe
    if(groupeFound !== undefined){
      groupeFound.nom = nouveauGroupe;
    }
    // Add new groupe
    else{
      groupeCopy.push({ groupe_id: timeId, nom: nouveauGroupe, champs: [] });
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
        index = groupeCopy[i].champs.findIndex(champ => champ.field_id === selectedChampId);
    // Modify champ
        if(index !== -1) {
          const tmpChamps = groupeCopy[i].champs[index];
          tmpChamps.nom = nouveauChamps;
          break
        }
     }
    // Add new champs

    if(index === -1){

      groupeCopy[groupeCopy.length - 1].champs.push({ field_id: timeId, nom: nouveauChamps, constraint: selectConstraint, require: mandatoryField });
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

  const handleSauvegardeSubmit = () => {

    axios.post('/api/sheetModel', {groupe: groupes, nomFicheS: nomFiche, descFicheS : descFiche })
      .then((response) => {
        console.log(response.status); 
        PropsCC.setPage("/")
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
            <input id="mandatoryField" name="mandatoryField" type="checkbox" className="check" checked={mandatoryField} onChange={handleChangeReq}/>

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

      <input type="image" className="Fgauche2" src={image6} onClick={() => PropsCC.setPage("/")} />

      <div className="felxRowConstraint">
        <div className="divChamps">

          <input type="text" className="NomFicheCSS" value={nomFiche} onChange={handleChangeNomFiche} placeholder="Nom de la Fiche..."/>

          {groupes.map((groupe) => (
            <ul>
              <li key={groupe.groupe_id} className="textgroupe">

                <button type="button" className="croixgroupe" onClick={() => handleDeleteGroupe(groupe.groupe_id)}>✖</button><span 
                onDoubleClick={() => changeGroupe(groupe.nom)} 
                className="labelgroupe">
                <label>- </label> {groupe.nom} <label>- </label></span>
                <div className="affichageGroupeDM">
                  <input type="image" className="Descente" src={image8} onClick={() => handleGroupeUpDown(groupe, +1)}/>
                  <input type="image" className="Monter" src={image7}onClick={() => handleGroupeUpDown(groupe, -1)}/>
                </div>

              </li>
              
              <li>

                  {groupe.champs.map((champ) => (

                    <div className="affichageAllChamps">
                      <div className="champRow">
                        <input className="affichageNomChamp" value={champ.nom} disabled />
                        <input className="affichageContrainte" value={champ.constraint.nom} disabled />

                        <input type="image" className="Modifchamps" src={image3} onClick={() => changeChamp(champ)} />
                        <button type="button" className="croixchamps" onClick={() => handleDeleteChamps(champ.field_id)}>✖</button>
                      <div className="affichageChampDM">
                        <input type="image" className="Monter" src={image7} onClick={() => {handleChampsMove(champ,-1)}}/>
                        <input type="image" className="Descente" src={image8} onClick={() => {handleChampsMove(champ,+1)}}/>

                      </div>
                      </div>
                    </div>
                  ))}

              </li>
              
            </ul>   
            

          ))}

          

          <div className="groupe">
            <input type="image" className="plus" id="mandatoryGroupe" name="mandatoryGroupe" src={image5} onClick={() => toggleModal(modalGroupes, setModalGroupes)} />
            <label className="insgroupe" htmlFor="mandatoryGroupe">INSERER UN GROUPE</label>
          </div>

          <textarea className="descFicheCSS" value={descFiche} onChange={handleChangeDescFiche} placeholder="Remarque..."/>

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
                    <div className="divNomRegex"><li className="NameRegex">Nom : {constr.nom}</li></div>
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
      <div className="boutonSauvegardeFicheCenter">
        <div className="boutonSauvegardeFiche">
          <button type="button" className="saugardeFicheButton" onClick={handleSauvegardeSubmit}>Sauvegarder La Fiche</button>
        </div>
      </div>
    </>
  );
}

export default CompoContrainte