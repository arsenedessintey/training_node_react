import React, { useEffect, useState } from 'react';
import "./App.css";
import "./component/Groupes.css";
import "./component/Champs.css";
import "./component/NewConstraint.css";
import "./component/ASF.css"
import AccueilSousFiche from './component/AccueilSousFiche';
import CompoContrainte from './component/CompoContrainte';



function App() {
  const [path, setStatePath] = useState(window.location.pathname);

  useEffect(() => {
    console.log('window.location.href :>> ', window.location.href);
  })

  const setPath = (newPath: string) => {
    // const location = new Location();
    // location.pathname =  newPath;
    window.location.pathname = newPath;
    console.log('window.location.href :>> ', window.location.href);
    setStatePath(newPath);
  }

  const  getPageComponent = () => {

    if(path === '/createSheet'){
      return <CompoContrainte setPage={setPath} />
    }
    else if (path === '/'){
      return <AccueilSousFiche setPage={setPath}/>
    }
    else if (path.includes('/modifySheet/')){
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
