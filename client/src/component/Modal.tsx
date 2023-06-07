import React, { useState } from "react";
import NewConstraint, { Constraint } from "./NewConstraint";
import axios from 'axios';



const Modal = () => {

    const [modal, setModal] = useState(false);


    const [constraint, setConstraint] = useState<Constraint[]>([]);

    async function getConstraint() { 
        const tmpConstraint:Constraint[] = (await axios.get('/api/tabCon')).data; 
        console.log(tmpConstraint)
        setConstraint(tmpConstraint);
    }
  
    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }

    
  
    return (
      <>
        <button onClick={toggleModal} className="btn-modal">
          CREER
        </button>
  
        {modal && (
          <NewConstraint togM={toggleModal} const={getConstraint}/>
          
        )}
      </>
    );
  }
  export default Modal