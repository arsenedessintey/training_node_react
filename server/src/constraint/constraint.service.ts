import { ValueConst } from "../type/type";

export const CreateRegex = (ValeurContrainte:ValueConst) => {
    
    const minLength = (ValeurContrainte.Value3);
    const maxLength = (ValeurContrainte.Value4);
    const onlyNum = (ValeurContrainte.Value5);
    const onlyLett = (ValeurContrainte.Value6);
    const MMAAAA = (ValeurContrainte.Value7);
    const DDMMAAAA = (ValeurContrainte.Value8);
    const Liste = (ValeurContrainte.Value9);
    let regexT = "Aucun"
  
    if(minLength !== ""){
  
      if(maxLength !== ""){
  
        regexT = `^[A-Z0-9-]{${minLength},${maxLength}}$`
  
        if(onlyNum === "true"){
            regexT = `^[0-9-]{${minLength},${maxLength}}$`
        }
  
        if(onlyLett === "true"){
            regexT = `^[A-Z-]{${minLength},${maxLength}}$`
        }
      }
    }
  
    if(MMAAAA === "true"){
      regexT = "^\d{4}\/(0?[1-9]|1[012])"
    }
  
    if(DDMMAAAA === "true"){
      regexT = "^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$"
    }
  
    if(Liste !== ""){
      regexT = `\\b(?:${Liste})\\b`
    }
  
    return regexT
    }