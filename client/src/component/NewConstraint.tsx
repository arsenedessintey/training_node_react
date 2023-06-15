import { useEffect, useState } from 'react'
import image1 from "./cancel.webp";
import axios from 'axios';
import CodeBar from './CodeBar';
import Date from './Date'
import Liste from './Liste';
import Libre from './Libre';
import Adresse from './Adresse';


interface Props {
  togM: () => void,
  const: () => void,
  selectConstraint: Constraint | undefined
}

export interface Constraint {

  contrainte_id: number
  nom: string
  type_contrainte: string
  valeur_regex: string
  Value1 : string
  Value2 : string
  Value3 : string
  Value4: string
  Value5: string
  Value6: string
  Value7: string
}

export default function NewConstraint(props: Props) {
  //Constante

  const tabType = [
    { value: "free",
      label: "Libre", 
      desc: "Aucune Contrainte dans le Champ",
      compo: <Libre /> 
    },
    { value: "codebar", 
      label: "CodeBar", 
      desc: "Cette Contrainte permet d'utiliser que des lettres et des chiffres dans le Champ", 
      compo: <CodeBar />,
    },
    { value: "date", 
      label: "Date", 
      desc: "Cette Contrainte permet d'utiliser uniquement des Dates dans le Champ (avec des /)", 
      compo: <Date />,
    },
    { value: "liste", 
      label: "Liste", 
      desc: "Cette contrainte permet d'écrire uniquement des mots complet définie dans le Champs ", 
      compo: <Liste />,
    },
    { value: "mac/wifi", 
      label: "Adresse Mac/Wifi", 
      desc:"Format perméttant d'utiliser uniquement des adresses mac ou wifi", 
      compo: <Adresse />
    }
  ]

  //State

  const [constraint, setConstraint] = useState<Constraint>({

    contrainte_id: 0,
    nom: "",
    type_contrainte: tabType[0].value,
    valeur_regex:"",
    Value1 : "",
    Value2 : "",
    Value3 : "",
    Value4 : "",
    Value5 : "",
    Value6 : "",
    Value7 : ""

  })

  useEffect(() => {

    if (props.selectConstraint !== undefined) {
      setConstraint(props.selectConstraint)
    }
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setConstraint((prev) => {
      return { ...prev, [name]: value };
    })
  };



  const handleSubmit = (e: any) => {
    e.preventDefault();

    const NewConstraint: Constraint = {
      ...constraint, 
      Value1: e.target[7].value,
      Value2: e.target[8].value,
      Value3: e.target[9].value,
      Value4: e.target[10].value,
      Value5: e.target[11].value,
      Value6: e.target[12].value,
      Value7: e.target[13].value,
    }

    // Choose url path to create or modify
    const urlStr = (typeof props.selectConstraint === 'undefined') ? '/api/constraint' : `/api/constraint/${props.selectConstraint?.contrainte_id}`;
    // Choose request method to create/post or modify/put
    const request = (typeof props.selectConstraint === 'undefined') ? axios.post : axios.put;

    // Send request
    request(urlStr, NewConstraint)
      .then((response) => {
        console.log(response.status);
        props.const();
        props.togM();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const MC = (props.selectConstraint === undefined) ? <p>CREER</p> : <p>MODIFIER</p>;

  //Affichage


  return (
    <div className="cont-center">
      <div className="cont">
        <input type="image" className="croix" src={image1} onClick={props.togM} />
        <br></br>
        <form onSubmit={handleSubmit}>
          <input type="text" className="Nom" placeholder="Nom.." value={constraint.nom} name="nom" onChange={handleChange} />
          <br></br>
          <br></br>
          <div className="radio_center">
            <div className="cadre_radio">
              <div className="display_flex_row">
                {tabType.map(({ value, label }) => {
                  return (<div key={value} >
                    <input type="radio" id={value} name="type_contrainte" value={value} checked={constraint.type_contrainte === value} onChange={handleChange} />
                    <label>{label}</label>
                  </div>)
                })}
              </div>
              <p>{tabType.find(({ value }) => constraint.type_contrainte === value)?.desc}</p>
            </div>
          </div>
          <br></br>
          <input type="text" className="Regex" placeholder="Regex.." name="valeur_regex" value={constraint.valeur_regex} onChange={handleChange} maxLength={20} />
          <br></br>
          <br></br>
          <div className="Regexcheck_center">
            <div className="Regexcheck">
              {tabType.find(({ value }) => constraint.type_contrainte === value)?.compo}
            </div>
          </div>
          <br></br>
          <div className="cntbuttonRegex">
              <button type="submit" className="buttonRegex"> {MC} </button>
          </div>
          <br></br>
        </form>
      </div>
    </div>
  );
}