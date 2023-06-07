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

  const handledelete = (id: any) => {

    alert("Attention tu vas supprimé une contrainte");

    fetch(`/api/constraint/${id}`, { method: 'DELETE' })
      .then((response) => {
        console.log(response.status);
        const constraintCopy = [...constraint];
        const constraintCopyUpt = constraintCopy.filter((constraints) => constraints.id !== id);
        setConstraint(constraintCopyUpt);
      })
      .catch((error) => {
        console.log(error);
      });

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