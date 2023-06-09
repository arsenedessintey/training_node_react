import { useEffect, useState } from 'react'
import image1 from "./cancel.webp";
import axios from 'axios';

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
}

export default function NewConstraint(props: Props) {
  //Constante

  const tabType = [
    { value: "free", label: "Libre", desc: "Aucune Contrainte dans le Champ" },
    { value: "codebar", label: "CodeBar", desc: "Cette Contrainte permet d'utiliser que des lettres et des chiffres dans le Champ" },
    { value: "date", label: "Date", desc: "Cette Contrainte permet d'utiliser uniquement des Dates dans le Champ (avec des /)" },
    { value: "yesno", label: "Yes/No", desc: "Cette contrainte permet d'écrire uniquement Oui ou Non dans le Champs " },
  ]

  //State

  const [constraint, setConstraint] = useState<Constraint>({

    contrainte_id: 0,
    nom: "",
    type_contrainte: tabType[0].value,
    valeur_regex: ""
  })

  useEffect(() => {

    if (props.selectConstraint !== undefined) {
      setConstraint(props.selectConstraint)
    }




  }, []);

  //Comportement

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setConstraint((prev) => {
      return { ...prev, [name]: value };
    })
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Choose url path to create or modify
    const urlStr = (typeof props.selectConstraint === 'undefined') ? '/api/constraint' : `/api/constraint/${props.selectConstraint?.contrainte_id}`;
    // Choose request method to create/post or modify/put
    const request = (typeof props.selectConstraint === 'undefined') ? axios.post : axios.put;

    // Send request
    request(urlStr, constraint)
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
          <input type="text" className="Regex" placeholder="Regex.." name="valeur_regex" value={constraint.valeur_regex} onChange={handleChange} maxLength={18} />
          <br></br>
          <br></br>
          <div className="Regexcheck_center">
            <div className="Regexcheck">
              <p>Choix Regex</p>
            </div>
          </div>
          <br></br>
          <button type="submit" className="boutoncreer"> {MC} </button>
        </form>
      </div>
    </div>
  );
}