import { useEffect, useState } from 'react'
import image1 from "./cancel.webp";
import axios from 'axios';
import CodeBar from './CodeBar';
import Date from './Date'
import Liste from './Liste';
import Libre from './Libre';
import Adresse from './Adresse';


interface Props {
  const: () => void,
  selectConstraint: Constraint
  setSelectedConstraint: (constraint: Constraint) => void
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

  // const [constraint, setConstraint] = useState<Constraint>({

  //   contrainte_id: 0,
  //   nom: "",
  //   type_contrainte: tabType[0].value,
  //   valeur_regex:"",
  //   Value1 : "",
  //   Value2 : "",
  //   Value3 : "",
  //   Value4 : "",
  //   Value5 : "",
  //   Value6 : "",
  //   Value7 : ""

  // })

  useEffect(() => {

    // if (props.selectConstraint !== undefined) {
    //   props.setConstraint(props.selectConstraint)
    // }
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    props.setSelectedConstraint({
      ...props.selectConstraint,
      [name]: value
    })
  };


  // const MC = (props.selectConstraint === undefined) ? <p>CREER</p> : <p>MODIFIER</p>;

  //Affichage


  return (
    <div className="divcontrainte">
        <input type="text" className="Nom" placeholder="Nom.." value={props.selectConstraint.nom} name="nom" onChange={handleChange} />
        <br></br>
        <br></br>
        <div className="radio_center">
          <div className="cadre_radio">
            <div className="display_flex_row">

                {tabType.map(({ value, label }) => {
                  return (<div key={value} >
                    <input className="CheckRad" type="radio" id={value} name="type_contrainte" value={value} checked={value === props.selectConstraint.type_contrainte} onChange={handleChange}/>
                    <label>{label}</label>
                  </div>)
                })}


            </div>
            <p>{tabType.find(({ value }) => props.selectConstraint.type_contrainte === value)?.desc}</p>
          </div>
        </div>
        <br></br>
        <input type="text" className="Regex" placeholder="Regex.." name="valeur_regex" value={props.selectConstraint.valeur_regex} onChange={handleChange} maxLength={20} disabled />
        <br></br>
        <br></br>
        <div className="Regexcheck_center">
          <div className="Regexcheck">
            {tabType.find(({ value }) => props.selectConstraint.type_contrainte === value)?.compo}
          </div>
        </div>
        <br></br>
        <br></br>
    </div>
  );
}