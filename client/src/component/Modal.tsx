import React, { useState } from "react";
import NewConstraint from "./NewConstraint";



const Modal = () => {

    const [modal, setModal] = useState(false);
  
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
          <NewConstraint />
        //   <input type="image" className="croix" src={image} />
        )}
      </>
    );
  }
  export default Modal