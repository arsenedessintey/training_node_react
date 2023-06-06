import { MouseEventHandler, useState } from 'react'
import image from "./cancel.png";

export default function NewConstraint() {
  //Constante

  const tabType = [
    {value: "free", label: "Libre", desc: "Aucune Contrainte dans le Champ"},
    {value: "cb", label: "CodeBar", desc: "Cette Contrainte permet d'utiliser que des lettres et des chiffres dans le Champ"},
    {value: "date", label: "Date", desc: "Cette Contrainte permet d'utiliser uniquement des Dates dans le Champ (avec des /)"},
    {value: "yn", label: "Yes/No", desc: "Cette contrainte permet d'écrire uniquement Oui ou Non dans le Champs "},
  ]

  //State

  const [constraint, setConstraint] = useState({
    nom:"",
    type:tabType[0].value,
    regex:""
  })
  //Comportement

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const{name,value} = e.target;
    setConstraint((prev) => {
      return {...prev, [name]: value};
    })
  };

 const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(constraint);
 }

  //Affichage
  return (
    <div className="cont-center">
      <div className="cont">
        <br></br>
        <form onSubmit={handleSubmit}>
          <input type="text" className="Nom" placeholder="Nom.." name="nom" onChange={handleChange}/>
          <br></br>
          <br></br>
          <div className="radio_center">
            <div className="cadre_radio">
              <div className="display_flex_row">
                {tabType.map(({value,label,desc}) => {
                  return (<div key={value} >
                    <input type="radio" id={value} name="type" value={value} checked={constraint.type === value} onChange={handleChange}/>
                    <label>{label}</label>
                  </div>)
                } )}
              </div>
              <p>{tabType.find(({value}) => constraint.type === value)?.desc}</p>
            </div>
          </div>
          <br></br>
          <input type="text" className="Regex" placeholder="Regex.." name="regex" onChange={handleChange}/>
          <br></br>
          <br></br>
          <div className="Regexcheck_center">
            <div className="Regexcheck">
              <p>Choix Regex</p>
            </div>
          </div>
          <br></br>
          <button type="submit" className="boutoncreer">CREER</button>
        </form>
      </div>
    </div>
  );
}