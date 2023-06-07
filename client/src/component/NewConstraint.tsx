import { MouseEventHandler, useState } from 'react'
import image from "./cancel.png";

interface Props {
  togM: () => void,
  const: () => void
}

export interface Constraint {
  nom: string
  type: string
  regex: string
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
    nom: "",
    type: tabType[0].value,
    regex: ""
  })

  //Comportement

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setConstraint((prev) => {
      return { ...prev, [name]: value };
    })
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // console.log(constraint);

    // POST
    const requestOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(constraint)
    };

    fetch('/api/constraint', requestOptions)
      .then((response) => {
        console.log(response.status);
        console.log(response.text());
        props.const();
        props.togM();
      })
      .catch((error) => {
        console.log(error);
      });

    // End POST
    props.const();
  }

  //Affichage


  return (
    <div className="cont-center">
      <div className="cont">
        <input type="image" className="croix" src={image} onClick={props.togM} />
        <br></br>

        {/* ---------------------------------------  FORM  ----------------------------------------- */}

        <form onSubmit={handleSubmit}>
          <input type="text" className="Nom" placeholder="Nom.." name="nom" onChange={handleChange} />
          <br></br>
          <br></br>
          <div className="radio_center">
            <div className="cadre_radio">
              <div className="display_flex_row">
                {tabType.map(({ value, label, desc }) => {
                  return (<div key={value} >
                    <input type="radio" id={value} name="type" value={value} checked={constraint.type === value} onChange={handleChange} />
                    <label>{label}</label>
                  </div>)
                })}
              </div>
              <p>{tabType.find(({ value }) => constraint.type === value)?.desc}</p>
            </div>
          </div>
          <br></br>
          <input type="text" className="Regex" placeholder="Regex.." name="regex" onChange={handleChange} />
          <br></br>
          <br></br>
          <div className="Regexcheck_center">
            <div className="Regexcheck">
              <p>Choix Regex</p>
            </div>
          </div>
          <br></br>
          <button type="submit" className="boutoncreer" >CREER</button>
        </form>

        {/* --------------------------------------------------------------------------------------- */}

      </div>
    </div>
  );
}