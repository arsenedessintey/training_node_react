import React, { useState, useEffect } from "react";
import NewConstraint, { Constraint } from "./NewConstraint";
import axios from 'axios';
import image2 from "./croix2.webp";



const Modal = () => {
    const [modal, setModal] = useState(false);

    const [constraint, setConstraint] = useState<Constraint[]>([]);

    useEffect(() => {

      getConstraint()
  
    }, []);

    async function getConstraint() { 
        const tmpConstraint:Constraint[] = (await axios.get('/api/tabCon')).data; 
        setConstraint(tmpConstraint);
        console.log(tmpConstraint);
    }
    

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

  const handledelete = (id: any) => {
    console.log(id)
    alert("Attention tu vas supprimé une contrainte");

    axios.delete(`/api/constraint/${id}`)
      .then((response) => {
        console.log(response.status);
        getConstraint();
      })
      .catch((error) => {
        console.log(error);
      });

  }

    return (
      <>
        {modal && (
          <NewConstraint togM={toggleModal} const={getConstraint}/>
          
        )}
        <div className="divBaccong">
          <div className="bacCong">
            <ul>
              {constraint.map(constr=>
              <div className="nnconstraint">
                <div className="nconstraint">
                <input type="image" className="croix2" src={image2} onClick ={() => handledelete(constr.contrainte_id)} />
                  <li>Nom : {constr.nom}<br></br>Regex Utilisé : {constr.valeur_regex}</li>
                </div>
              </div>
              )}
              <div className="btn_modal_center">
                <button onClick={toggleModal} className="btn-modal">
                  +
                </button>
            </div>
            </ul>
          </div>
        </div>
      </>
    );
  }
  export default Modal