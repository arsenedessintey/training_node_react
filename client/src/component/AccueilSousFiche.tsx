import React, { useState, useEffect } from "react";
import CompoContrainte from "./CompoContrainte";
import axios from "axios";
import Modal from "./Modal";
import Dossier from "./Dossier";

interface Props {
    setPage: (newPage: string) => void
}

interface Recherches {
    sheet_id:number
    nom:string
    nomVersion:string
}

const AccueilSousFiche = (props: Props) => { 

    const [recherches, setRecherches] = useState<Recherches[]>([])

    const [modalDossier, setModalDossier] = useState(false)

    const [dossier, setDossier] = useState([])

    const [nouveauDossier , setNouveauDossier] = useState("")

    const toggleModalASF = (modal: boolean, setter: (modal: boolean) => void) => {

        setNouveauDossier("")
    
        setter(!modal);
      };

    useEffect(() => {

        getRecherche()

        // getDossier()
        
    
      }, []);

      const handleSubmitDossier = (e:any) => {
        e.preventDefault()

        axios.post('/api/Dossier', {nomDossier: nouveauDossier})
            .then((response) => {
                console.log(response.status);
                toggleModalASF(modalDossier, setModalDossier)
            })
            .catch((error) => {
                console.log(error);
            });

        console.log('"ok" :>> ', "ok");

      }

      const handleChangeDossier = (e:any) => {

            const valueAfterDossier = e.target.value;
            setNouveauDossier(valueAfterDossier);
      }

    async function getDossier() {
        const tmpDossier = (await axios.get('/api/DossierGet')).data;
        setDossier(tmpDossier)
        
    }

    async function getRecherche() {
        const tmpRecherche = (await axios.get('/api/recherche')).data;
        setRecherches(tmpRecherche);
      }

    return(

    <>
        {modalDossier && 
            <Modal
            toggle={() => toggleModalASF(modalDossier, setModalDossier)}
            handleSubmit={handleSubmitDossier}
            >
                <Dossier handleChangeDossier={handleChangeDossier} nouveauDossier={nouveauDossier}/>
            </Modal>
        }

        <div className="CentereRecherche">
            <div className=" CadreRecherche">

                    {recherches.map((recherche) => (
                        <li key={recherche.nom}>
                        
                        <div onClick={() => props.setPage("/modifySheet/" + recherche.sheet_id )} className="nomDeFiche"><p className="recherchenom">{recherche.nom}</p><p className="recherheversion">{recherche.nomVersion}</p></div>

                        </li>

                    ))}
                </div>
                

                <div className="button_ASF">
                    <button type="button" className="buttonSF" onClick= {() => props.setPage("/createSheet")}>CREER DES FICHES</button>
                    <button type="button" className="buttonSF" onClick= {() => toggleModalASF(modalDossier, setModalDossier)}>CREER UN DOSSIER</button>
                </div>

        </div>
        
    </>


    );
}
export default AccueilSousFiche