declare namespace a {

    interface Groupeinter {
        idg: number
        nom: string
        champs: Champ[]
      }
      
    type ChildSheet = {
        sheet_id: number 
      }
      
    interface Champ {
        idc: number
        nom: string
        constraint: Constraint
        obligatoire:boolean
        explication:string
        sheet_id: string
      }
      
    interface Constraint {
      
        contrainte_id: number
        nom: string
        activation: boolean
        type_contrainte: string
        valeur_regex: string
        Value1 : string
        Value2 : string
        Value3 : string
        Value4: string
        Value5: string
        Value6: string
        Value7: string
        Value8: string
        Value9: string
      
      }

    interface ValueConst {

        Value1:any,
        Value2:any,
        Value3:any,
        Value4:any,
        Value5:any,
        Value6:any,
        Value7:any,
        Value8:any,
        Value9:any,
        
    }
      
    interface Recherches {
        sheet_id:number
        nom:string
        nomVersion:string
      }
      
    interface Dossiers {
        dossier_id: number 
        nom:string   
        sheet:Sheet[]  
        activationdoss:boolean
      }
      
    type Sheet = {
        sheet_id: number
        nom: string
        description: string | null,
        groupe: Groupeinter[]
        activationSheet: Boolean
        nomVersion: string
      }

}
export = a;