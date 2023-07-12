import { Champ, Groupeinter } from "../type/type"

 export const parseurGroupe = (groupes: Groupeinter[]) => {
    return groupes.map((groupe, i) => {
      return {
        nom: groupe.nom,
        ordre: i,
        champs: {
          create: parseurChamps(groupe.champs)
        }
      }
    })
  }


const parseurChamps = (champs: Champ[]) => {
    return champs.map((champ, i) => {
  
      const convertSheet_idInt = (champ.sheet_id)? parseInt(champ.sheet_id) : null;
      
      return {
          nom: champ.nom,
          obligatoire: champ.obligatoire,
          ordre: i,
          constraintId: champ.constraint.contrainte_id,
          explication: champ.explication,
          sheet_id : convertSheet_idInt 
        }
    })
  }