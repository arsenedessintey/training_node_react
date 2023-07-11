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
import { setPath, swipeArrayElem, swipeArrayElemGroupe } from "../utils/utils";
import Groupes from "./Groupes";
import Champs from "./Champs";
import VersionFiche from "./VersionFiche";

interface PropsCC {
  setPage: (newPage: string) => void
}

export type Sheet = {
  sheet_id: number
  nom: string
  description: string | null,
  groupe: Groupeinter[]
  activationSheet: Boolean
  nomVersion: string
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
  obligatoire: boolean
  explication:string
  display: boolean
  sheet_id:string
}

const CompoContrainte = (PropsCC: PropsCC) => {
  // Modal Champs
  const [modalChamps, setModalChamps] = useState(false);

  // Modal Groupes
  const [modalGroupes, setModalGroupes] = useState(false);

  //Modal Contraintes
  const [modalContraintes, setModalContraintes] = useState(false);

  //Modal Lien Sous Fiche
  const [modalLienSF, setModalLienSF] = useState(false);

  //Modal VersionFiche
  const [modalVersion, setModalVersion] = useState(false)

  const [explicationS, setExplicationS] = useState("")

  const [valueSelect, setValueSelect] = useState<string>("")


  const [constraint, setConstraint] = useState<Constraint[]>([]);

  const emptyConstraint: Constraint = {
    contrainte_id: -1,
    nom: "",
    activation: true,
    type_contrainte: 'free',
    valeur_regex: "",
    Value1: "",
    Value2: "",
    Value3: "",
    Value4: "",
    Value5: "",
    Value6: "",
    Value7: "",
    Value8: "",
    Value9: "",
  }



  const [selectConstraint, setSelectConstraint] = useState<Constraint>(
    emptyConstraint
  );
  const [selectedGroupe, setSelectedGroupe] = useState<string>("");

  const [selectedChampId, setSelectedChampId] = useState<number>(-1);

  useEffect(() => {

    getConstraint()

    getSheet()

    getAllSheetSelect()

  }, []);

  //GROUPE STATE

  const timeId = new Date().getTime()

  //

  const [groupes, setGroupe] = useState<Groupeinter[]>([
    { groupe_id: timeId, nom: "Default", champs: [] }
  ]);

  const [nouveauGroupe, setNouveauGroupe] = useState("");

  const [nouveauChamps, setNouveauChamps] = useState("")

  const [mandatoryField, setMandatoryField] = useState(false);

  const [nomFiche, setNomFiche] = useState("")

  const [versionFiche, setVersionFiche] = useState("V1")

  const [descFiche, setDescFiche] = useState("")

  const [allSheet, setAllSheet] = useState<Sheet[]>([])

  const [allSheetSlect, setAllSheetSelect] = useState<Sheet[]>([])

  const [sheetId, setSheetId] = useState(-1)

  const [errorVersion, setErrorVersion] = useState("")

  const [creaFiche, setCreaFiche] = useState("Créer La Fiche")
  

  //FIN GROUPE STATE

  async function getConstraint() {
    const tmpConstraint: Constraint[] = (await axios.get('/api/tabCon')).data;
    setConstraint(tmpConstraint);
  }

  

  async function getSheet() {

    if (window.location.toString().includes('/modifySheet')) {

      setCreaFiche("Dupliquer la Fiche")

      const pathArray = window.location.pathname.toString().split("/")

      const sheet_id = pathArray[pathArray.length - 1]

      try {
        
        const sheetSch: Sheet = JSON.parse((await axios.get(`/api/modifyS/${sheet_id}`)).data)

      const newGroupe = sheetSch.groupe
      console.log('sheeSch.groupe :>> ', sheetSch.groupe);
      const Version = sheetSch.nomVersion
      const Sheet__id = sheetSch.sheet_id
      

      setGroupe(newGroupe)
      setSheetId(Sheet__id)
      setVersionFiche(Version)

      setNomFiche(sheetSch.nom);
      setDescFiche(sheetSch.description ?? "");

      getAllSheet(Sheet__id)
      setVersionFiche("V1")

    }
  }
}
  
  async function getAllSheet(idsheeet:number) {
    const AllSheet = (await axios.get(`/api/allSheet/${idsheeet}`)).data;
    setAllSheet(AllSheet)
  }

  async function getAllSheetSelect() {
    const AllSheetSelect = (await axios.get(`/api/allSheetSelect`)).data;
    setAllSheetSelect(AllSheetSelect);
  }

  const changeGroupe = (groupes: string) => {
    toggleModal(modalGroupes, setModalGroupes)
    setSelectedGroupe(groupes);
  }

  const changeChamp = (champs: Champ) => {
    toggleModal(modalChamps, setModalChamps)
    setSelectedChampId(champs.field_id);
    setSelectConstraint(champs.constraint)
    setNouveauChamps(champs.nom)
    setExplicationS(champs.explication)
  }
  //Modal Contrainte
  const toggleModal = (modal: boolean, setter: (modal: boolean) => void, constraint?: Constraint) => {

    setSelectConstraint(constraint ?? emptyConstraint);
    setNouveauGroupe("")
    setSelectedGroupe("")
    setNouveauChamps("")
    setSelectedChampId(-1)
    setExplicationS("")

    setter(!modal);
  };

  const handledelete = (id: number) => {

    axios.put(`/api/constraintDel/${id}`)
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

  const handleDeleteChamps = (idc: number) => {
    const groupeCopy = [...groupes];

    for (let i = 0; i < groupeCopy.length; i++) {
      const indexChamp = groupeCopy[i].champs.findIndex(champ => {
        return champ.field_id === idc
      });

      if (indexChamp !== -1) {
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

  const handleGroupesMove = (moveGroupe: Groupeinter, travel: -1 | 1) => {

    const groupeCopy = [...groupes];

    let indexGroupeClick = -1;

    for (let i = 0; i < groupeCopy.length; i++) {

      indexGroupeClick = groupeCopy.findIndex(groupe => groupe.groupe_id === moveGroupe.groupe_id);
      const arrayLimit = (travel !== 1) ? 0 : groupeCopy.length - 1;

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

  const handleChangeChamps = (e: any) => {

    const valueAfterChamps = e.target.value;
    setNouveauChamps(valueAfterChamps);

  }

  const handleChangeReq = (e: any) => {
    const { checked } = e.target;
    setMandatoryField(checked);
  }

  const handleChangeNomFiche = (e: any) => {
    const valueAfterNomFiche = e.target.value;
    setNomFiche(valueAfterNomFiche);
  }

  const handleChangeVersionFiche = (e:any) => {
    const valueAfterVersionFiche = e.target.value;
    setVersionFiche(valueAfterVersionFiche);

  }

  const handleChangeDescFiche = (e: any) => {
    const valueAfterDescFiche = e.target.value;
    setDescFiche(valueAfterDescFiche);
  }

  const handleSubmitGroupes = (e: any) => {
    e.preventDefault();

    const groupeCopy = [...groupes];

    const groupeFound = groupeCopy.find(groupe => groupe.nom === selectedGroupe);

    // Modify the groupe
    if (groupeFound !== undefined) {
      groupeFound.nom = nouveauGroupe;
    }
    // Add new groupe
    else {
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
    for (let i = 0; i < groupeCopy.length; i++) {
      index = groupeCopy[i].champs.findIndex(champ => champ.field_id === selectedChampId);
      // Modify champ
      if (index !== -1) {
        const tmpChamps = groupeCopy[i].champs[index];
        tmpChamps.nom = nouveauChamps;
        tmpChamps.explication = explicationS


        break
      }
    }
    // Add new champs

    if (index === -1) {

      groupeCopy[groupeCopy.length - 1].champs.push({
        field_id: timeId,
        nom: nouveauChamps,
        constraint: selectConstraint, 
        obligatoire: mandatoryField, 
        explication: explicationS, 
        sheet_id: valueSelect,
        display: false
      });
    }

    // save changes
    setGroupe(groupeCopy);
    setNouveauChamps("");
    setExplicationS("")
    setSelectedChampId(-1)
    toggleModal(modalChamps, setModalChamps)
    console.log('explicationS :>> ', explicationS.length);
  }


  const handleSubmitContraintes = (e: any, ) => {
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
      Value8: e.target[15].value,
      Value9: e.target[16].value,
    }

    groupes.forEach(groupe => {

      groupe.champs.forEach(champ => {

        if(champ.constraint.contrainte_id === selectConstraint.contrainte_id){

            champ.constraint.nom = selectConstraint.nom

        }
        
      });

    });

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

  const disableSheet = (sheetID: number, newSheetId?: number) => {
    return axios.put(`/api/switchVersion/${sheetID}?newSheetId=${newSheetId}`)
  }

  const addSheetVersion = () => {
    return axios.post('/api/sheetModel', { groupe: groupes, nomFicheS: nomFiche, descFicheS: descFiche, lienSFS: valueSelect, nomVersion: versionFiche, activationSheet: true })
  }

  const handleSauvegardeSubmitID = (e: any) => {
    e.preventDefault();

    addSheetVersion ()
      .then((response) => {
        const JSONsheet: Sheet = (response).data

        const nswSheetID = JSONsheet.sheet_id

        disableSheet(sheetId, nswSheetID)
          .then((response) => {
            console.log(response.status);
            PropsCC.setPage("/")
          })
          .catch((error) => {
            console.log(error);
          });

      })

      .catch((error) => {
        console.log(error);
        if(error.response.data === "Not unique sheet id") {
          // Afficher que la version existe déjà
          setErrorVersion("Cette Version est déjà utilisé");
        }
      });
  }

   const handleSauvegardeSubmit = async (e:any) => {
    e.preventDefault();
    
    await axios.post('/api/sheetModel', { groupe: groupes, nomFicheS: nomFiche, descFicheS: descFiche, Sheet_id: valueSelect, nomVersion: "V1", activationSheet: true })
      .then((response) => {
        console.log(response.status);
        PropsCC.setPage("/")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmitModificationFiche = (e:any) => {
    e.preventDefault();

    axios.delete(`/api/sheetModelModif/${sheetId}`)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.log(error);
    });

    axios.post('/api/sheetModel', { groupe: groupes, nomFicheS: nomFiche, descFicheS: descFiche, Sheet_id: valueSelect, nomVersion: versionFiche, activationSheet: true})
    .then((response) => {
      console.log(response.status);
      PropsCC.setPage("/")
    })
    .catch((error) => {
      console.log(error);
    });

    

}
  const BackHistory = () => {

    window.history.go(-1)

  }

  const handleChangeTextAreaChamps = (e:any) => {
    const valueTextAreaChamps = e.target.value;
    setExplicationS(valueTextAreaChamps);
  }

  const explicationCss = (champ:Champ) => {
    return (champ.display) ? "TextAreaExplication" : "TextAreaExplication2";
}

const handleDoubleSubmitChamps = (groupeIdx: number, champIdx:number) => {

  let tmpGr = [...groupes];
  let tmpDisplay = tmpGr[groupeIdx].champs[champIdx].display
  tmpGr[groupeIdx].champs[champIdx].display = !tmpDisplay;
  setGroupe((tmpGr))

}

const handleChangeSelect = (e:any) => {
  const valueSlectChamp = e.target.value;
  setValueSelect(valueSlectChamp);
}



  //FIN GROUPE//



  return (
    <>
      {modalChamps &&
        <Modal
          toggle={() => toggleModal(modalChamps, setModalChamps)}
          handleSubmit={handleSubmitChamps}
        >
          <Champs nouveauChamps={nouveauChamps} handleChangeChamps={handleChangeChamps} selectConstraint={selectConstraint} mandatoryField={mandatoryField} 
          handleChangeReq={handleChangeReq} explicationS={explicationS} handleChangeTextAreaChamps={handleChangeTextAreaChamps} allSheetSlect={allSheetSlect}
          handleChangeSelect={handleChangeSelect}/>
        </Modal>
      }

      {modalGroupes && (
        <Modal
          toggle={() => toggleModal(modalGroupes, setModalGroupes)}
          handleSubmit={handleSubmitGroupes}
        >
          <Groupes handleChangeGroupe={handleChangeGroupe} nouveauGroupe={nouveauGroupe} />
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

      {modalVersion && (
        <Modal
          toggle={() => toggleModal(modalVersion, setModalVersion)}
          handleSubmit={handleSauvegardeSubmitID}
        >
          <VersionFiche versionFiche={versionFiche} handleChangeVersionFiche={handleChangeVersionFiche} nomFiche={nomFiche} handleChangeNomFiche={handleChangeNomFiche} sheetId={sheetId} Version={errorVersion}/>
        </Modal>
      )}

      <button type="button" className="Bouton_HautSousFiche Fgauche2" onClick={BackHistory}>
        <img width={"50px"} src={image6} />
      </button>

      <form id="postSheet" onSubmit={handleSauvegardeSubmit}>
        
        <div className="felxRowConstraint">
          <div className="divChamps">

            <input type="text" className="NomFicheCSS" value={nomFiche} onChange={handleChangeNomFiche} placeholder="Nom de la Fiche" required /><br></br>
            <input type="text" className="VersionFicheCSS" value={versionFiche} onChange={handleChangeVersionFiche} placeholder="Version de la Fiche" disabled/>

            {groupes.map((groupe, grIdx) => (
              <ul key={groupe.groupe_id}>
                <li className="textgroupe">

                  <button type="button" className="croixgroupe" onClick={() => handleDeleteGroupe(groupe.groupe_id)}>✖</button><span
                    onDoubleClick={() => changeGroupe(groupe.nom)}
                    className="labelgroupe">
                    <label>- </label> {groupe.nom} <label>- </label></span>
                  <div className="affichageGroupeDM">
                    <button type="button" className="Bouton_HautSousFiche" onClick={() => { handleGroupesMove(groupe, -1) }}>
                      <img className="Monter" src={image7} />
                    </button>
                    <button type="button" className="Bouton_BasSousFiche" onClick={() => { handleGroupesMove(groupe, +1) }}>
                      <img className="Descente" src={image8} />
                    </button>
                  </div>

                </li>

                <li>

                  {groupe.champs.map((champ, champIdx) => (

                    <div key={champ.field_id} className="affichageAllChamps">
                      <div className="champRow"  >

                        {champ.constraint.type_contrainte === "link"
                        ?<span>
                          <span onDoubleClick={() => handleDoubleSubmitChamps(grIdx, champIdx)}><input className="affichageNomChamp" value={champ.nom} disabled /></span>
                          <a className="Soulignement" href={"/modifySheet/" + champ.sheet_id} target='_blank'>
                            <input className="affichageContrainteS" value={champ.constraint.nom} disabled />
                          </a>
                          
                        </span>
                        :<span>
                          <span onDoubleClick={() => handleDoubleSubmitChamps(grIdx, champIdx)}><input className="affichageNomChamp" value={champ.nom} disabled /></span>
                          <input className="affichageContrainte" value={champ.constraint.nom} disabled />
                        </span>
                        }

                        <img className="Modifchamps" src={image3} onClick={() => changeChamp(champ)} />
                        <button type="button" className="croixchamps" onClick={() => handleDeleteChamps(champ.field_id)}>✖</button>
                        <div className="affichageChampDM">
                          <button type="button" className="Bouton_HautSousFiche" onClick={() => { handleChampsMove(champ, -1) }}>
                            <img className="Monter" src={image7} />
                          </button>
                          <button type="button" className="Bouton_BasSousFiche" onClick={() => { handleChampsMove(champ, +1) }}>
                            <img className="Descente" src={image8} />
                          </button>
                        </div><br></br><br></br>
                        
                      </div>
                      <textarea className={explicationCss(champ) } value={champ.explication} disabled/>
                    </div>
                  ))}

                </li>

              </ul>


            ))}


            <div className="groupe">
              <button className="Bouton" type="button" onClick={() => toggleModal(modalGroupes, setModalGroupes)}>
                <img className="plus" src={image5} alt="Add" />
                <label className="insgroupe" htmlFor="mandatorySheet">INSERER UN GROUPE</label>
              </button>
            </div>

            <textarea className="descFicheCSS" value={descFiche} onChange={handleChangeDescFiche} placeholder="Remarque..." />

          </div>


          <div className="CadreBacSave">
            <div className="bacCong">
              <ul>
                {constraint.map(constr =>
                  <div key={constr.nom} className="nconstraint">
                    <div className="divcroisupp"><button type="button" className="croixCont" onClick={() => { if (window.confirm("Attention tu vas supprimer une contrainte")) { handledelete(constr.contrainte_id) } }}>✖</button></div>
                    <div className="divmodif"><img className="Modif" src={image3} onClick={() => toggleModal(modalContraintes, setModalContraintes, constr)} /></div>
                    <img className="Fgauche" src={image4} onClick={() => { toggleModal(modalChamps, setModalChamps, constr) }} />
                    <div className="divNomRegex"><li className="NameRegex">Nom : {constr.nom}</li></div>
                  </div>
                )}
                <div className="btn_modal_center">
                  <button type="button" onClick={() => toggleModal(modalContraintes, setModalContraintes)} className="btn-modal">
                    +
                  </button>
                </div>
              </ul>
            </div>

              <button type="submit" form="postSheet" className="saugardeFicheButton"> {creaFiche}</button>
              <button type="button" onClick={(e) => {e.preventDefault(); toggleModal(modalVersion, setModalVersion)}} className="saugardeFicheButton"disabled={sheetId === -1}>Changer La Version</button>
              <button type="button" onClick={handleSubmitModificationFiche} className="saugardeFicheButton"disabled={sheetId === -1}>Modifier La Fiche</button>

          </div>
        </div>
         
      </form>

    </>
  );
}

export default CompoContrainte