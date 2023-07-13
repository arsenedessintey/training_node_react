import React, { useEffect, useState } from 'react';
import "./App.css";
import "./component/Groupes.css";
import "./component/Champs.css";
import "./component/NewConstraint.css";
import "./component/ASF.css"
import "./component/LienSF.css";
import "./component/ChoixFicheDossier.css"
import AccueilSousFiche from './component/AccueilSousFiche';
import CompoContrainte from './component/CompoContrainte';
import { setPath } from './utils/utils';



function App() {
  

  useEffect(() => {
  })

  const getPageComponent = () => {

    let path = window.location.pathname;

    if(path === '/createSheet'){
      return <CompoContrainte />
    }
    else if (path === '/'){
      return <AccueilSousFiche />
    }
    else if (path.includes('/modifySheet')){
      return <CompoContrainte />
    }
    else{
      return <>page not found</>
    }
    }
 
  return (
    <div className="App">
        {
          getPageComponent()
        }
        
    </div>
  );
}

export default App;
