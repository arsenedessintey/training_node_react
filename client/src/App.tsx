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



function App() {
  const [path, setStatePath] = useState(window.location.pathname);

  useEffect(() => {
  })



  const  getPageComponent = () => {

    if(path === '/createSheet'){
      return <CompoContrainte setPage={setPath} />
    }
    else if (path === '/'){
      return <AccueilSousFiche setPage={setPath}/>
    }
    else if (path.includes('/modifySheet')){
      return <CompoContrainte setPage={setPath}/>
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
