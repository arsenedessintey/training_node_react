import React, { useState } from 'react'

export default function NewConstraint() {
  //State

  const [constraint, setConstraint] = useState({
    nom:"",
    contrainte:"",
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
    <div id="Cont">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom.." name="nom" onChange={handleChange}/>
        <br></br>
        <select onChange={handleChange} name="contrainte">
          <option>Contraintes :</option>
          <option>Libre</option>
          <option>Code Bar</option>
          <option>...</option>
          <option>...</option>
        </select>
        <br></br>
        <input type="text" placeholder="Regex.." name="regex" onChange={handleChange}/>
        <br></br>
        <button type="submit">CREER</button>
      </form>
    </div>
  );
}