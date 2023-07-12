import React, { useState, useEffect } from "react";
import CompoContrainte, { Sheet } from "./CompoContrainte";
import axios from "axios";
import Modal from "./Modal";
import Dossier from "./Dossier";
import ChoixFicheDossier from "./ChoixFicheDossier";
import ModalSansValide from "./ModalSansValide";
import imageDossier from "./Dossier.svg"
import AffichageDossier from "./AffichageDossier";
import DossAllFiche from "./DossAllFiche";

interface Props {
    setPage: (newPage: string) => void
}

export interface Recherches {
    sheet_id:number
    nom:string
    nomVersion:string
}

export interface Dossiers {
    dossier_id:number
    nom:string   
    sheet:Sheet[]     
}

const AccueilSousFiche = (props: Props) => { 

    const [recherches, setRecherches] = useState<Recherches[]>([])

    const [modalDossier, setModalDossier] = useState(false)

    const [modalChoixFiche, setModalChoixFiche] = useState(false)

    const [dossiers, setDossier] = useState<Dossiers[]>([])

    const [nouveauDossier , setNouveauDossier] = useState("")

    const [selectedIdDossier, setSelectedIdDossier] = useState(-1)

    const [modalAffichageDossier, setModalAffichageDossier] = useState(false)

    const [modalDossAllFiche, setModalDossAllFiche] = useState(false)

    const toggleModalASF = (modal: boolean, setter: (modal: boolean) => void) => {

        setNouveauDossier("")
    
        setter(!modal);
      };

    useEffect(() => {

        getRecherche()

        getDossier()
        
    
      }, []);

      const handleSubmitDossier = (e:any) => {
        e.preventDefault()

        axios.post('/api/dossier/createDoss', {nomDossier: nouveauDossier})
            .then((response) => {
                console.log(response.status);
                toggleModalASF(modalDossier, setModalDossier)
                window.history.go(0)
            })
            .catch((error) => {
                console.log(error);
            });

      }

      const handleChangeDossier = (e:any) => {

            const valueAfterDossier = e.target.value;
            setNouveauDossier(valueAfterDossier);
      }

        async function getDossier() {
            const tmpDossier = (await axios.get('/api/dossier/DossierGet')).data;
            setDossier(tmpDossier)
        }

        async function getRecherche() {
            const tmpRecherche = (await axios.get('/api/sheet/recherche')).data;
            setRecherches(tmpRecherche);
        }

        const idDossierRecup = (idDossier:number) => {

            toggleModalASF(modalAffichageDossier, setModalAffichageDossier)

            setSelectedIdDossier(idDossier)


        }

        const handleDeleteDossier = (id: number) => {

            axios.put(`/api/dossier/DossierDel/${id}`)
              .then((response) => {
                console.log(response.status);
                window.history.go(0)
        
              })
              .catch((error) => {
                console.log(error);
              });
        
          }

        const handleSubmitDesacSheet = (id: number) => {

        axios.put(`/api/sheet/DesacSheet/${id}`)
        .then((response) => {
            console.log(response.status);
            window.history.go(0)
        })
        .catch((error) => {
            console.log(error);
        });
    
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


        {modalAffichageDossier &&
            <ModalSansValide
            toggle={() => toggleModalASF(modalAffichageDossier, setModalAffichageDossier)}
            >
                <AffichageDossier toggleDossier={() => toggleModalASF(modalChoixFiche, setModalChoixFiche)} idDossier={selectedIdDossier} handleSubmitDelDossier={handleDeleteDossier}/>
            </ModalSansValide>
        }

        
        {modalChoixFiche &&
            <ModalSansValide
            toggle={() => toggleModalASF(modalChoixFiche, setModalChoixFiche)}
            >
                <ChoixFicheDossier recherches={recherches} toggle={() => toggleModalASF(modalChoixFiche, setModalChoixFiche)} idDossier={selectedIdDossier} />
            </ModalSansValide>
        
        }

        {modalDossAllFiche && 
            <ModalSansValide
            toggle={() => toggleModalASF(modalDossAllFiche,setModalDossAllFiche)}
            >
                    <DossAllFiche recherches={recherches} handleSubmitDesacSheet={handleSubmitDesacSheet}/>
            </ModalSansValide>
        }

        <div className="CentereRecherche">
            <div className=" CadreRecherche">

                    {dossiers.map((dossier) => (
                        <li key={dossier.dossier_id}>

                             <div onClick={() => idDossierRecup(dossier.dossier_id)} className="nomDeFiche">
                                <img className="dossier" src={imageDossier}/>
                                <p className="recherchedoss">{dossier.nom}</p>
                             </div>


                        </li>

                    ))}
            </div>
                

                <div className="button_ASF">
                    <button type="button" className="buttonSF" onClick={() => toggleModalASF(modalDossAllFiche, setModalDossAllFiche)}>FICHES</button>
                    <button type="button" className="buttonSF" onClick= {() => props.setPage("/createSheet")}>CREER DES FICHES</button>
                    <button type="button" className="buttonSF" onClick= {() => toggleModalASF(modalDossier, setModalDossier)}>CREER UN DOSSIER</button>
                </div>

        </div>
        
    </>


    );
}
export default AccueilSousFiche