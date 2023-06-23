import React, { useState, useEffect } from "react";
import CompoContrainte from "./CompoContrainte";

const AccueilSousFiche = () => { 

    const [modalSousFiche, setModalSousFiche] = useState(false);

    const toggleModalSousFiche = () => {
        setModalSousFiche(!modalSousFiche)
    }




    return(
    <>

    {modalSousFiche && 

    <CompoContrainte toggleSF={toggleModalSousFiche}/>
    
    
    
    }
    <button type="button" className="buttonSF" onClick= {toggleModalSousFiche}>MODAL</button>
    
    
    
    
    
    </>


    );
}
export default AccueilSousFiche