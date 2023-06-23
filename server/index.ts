import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Contrainte, PrismaClient } from '@prisma/client';


interface Groupeinter {
  idg: number
  nomGroupe: string
  champs: Champ[]
}

interface Champ {
  idc: number
  nomChamps: string
  contrainteChamps: Constraint
}

export interface Constraint {

  contrainte_id: number
  nom: string
  type_contrainte: string
  valeur_regex: string
  Value1 : string
  Value2 : string
  Value3 : string
  Value4: string
  Value5: string
  Value6: string
  Value7: string
}

export const prisma = new PrismaClient();

  const CreateRegex = (req: { body: { Value1: any , Value2 : any, Value3 : any, Value4 : any, Value5 : any, Value6 : any, Value7:any, }; }) => {
    
  const minLength = (req.body.Value1);
  const maxLength = (req.body.Value2);
  const onlyNum = (req.body.Value3);
  const onlyLett = (req.body.Value4);
  const MMAAAA = (req.body.Value5);
  const DDMMAAAA = (req.body.Value6);
  const Liste = (req.body.Value7);
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
    regexT = "^[0-9]{1,2}\/[0-9]{4}$"
  }

  if(DDMMAAAA === "true"){
    regexT = "^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$"
  }

  if(Liste !== ""){
    regexT = `\\b(?:${Liste})\\b`
  }

  return regexT
  }

interface Constraint2 {
  nom: string
  type: string
  regex: string 
  id:number
}

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the Express application
const app: Express = express();

// Apply the CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Set the server port by reading the value from the PORT environment variable
const port = process.env.PORT;

app.use(express.json());

// Handler for the root route '/'
app.get('/', (req: Request, res: Response) => {
  // Respond with the string 'Express + TypeScript Server'
  res.send('Express + TypeScript Server');
});

app.post('/api/constraint', async (req: Request, res: Response) => {

  //Regex
  console.log('req.body :>> ', req.body);
  const reqRegex = req;
  const regexT = CreateRegex(reqRegex)
  //Base
  const nom:string = (req.body.nom);
  const type:string = (req.body.type_contrainte);


  prisma.contrainte.create({
    data: {
      nom: nom,
      type_contrainte: type,
      valeur_regex: regexT,
    }
  })
  .then((response) => {
    console.log(response);
    return res.status(200).send("Contrainst add");
  })
  .catch((error) => {
    console.log(error)
    return res.status(404).send("Contrainst not add");
  })
});

app.delete('/api/constraint/:id',  (req: Request, res: Response) => {
  const id:number = Number(req.params.id);

    prisma.contrainte.delete({
    where: {
      contrainte_id: id,
    },
  })
  .then((response) => {
    console.log(response);
    return res.status(200).send("Contrainst suppr");
  })
  .catch((error) => {
    console.log(error)
    return res.status(404).send("Contrainst not suppr");
  })

});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Print a message indicating that the server is running and specify the URL
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


app.get('/api/tabCon', async (req: Request, res: Response  ) => {

const allConstraint = await prisma.contrainte.findMany()
return res.status(200).json(allConstraint);

});

app.put('/api/constraint/:id', async (req: Request, res: Response) => {
  const id:number = Number(req.params.id);

  const nom:string = (req.body.nom);
  const type:string = (req.body.type_contrainte);
  const reqRegex = req;
  const regexT = CreateRegex(reqRegex)

  prisma.contrainte.update({
    where: {
      contrainte_id:id,
    },
    data:{
      nom: nom,
      type_contrainte: type,
      valeur_regex: regexT,
    }
  })
  .then((response) => {
    console.log(response);
    return res.status(200).send("Contrainst add");
  })
  .catch((error) => {
    console.log(error)
    return res.status(404).send("Contrainst not add");
  })
});

const parseurGroupe = (groupes: Groupeinter[],) => {
  return groupes.map((groupe, i) => {
    return {
      nom: groupe.nomGroupe,
      ordre: i,
      champs: {
        createMany : {
          data: parseurChamps(groupe.champs)
        }
      }
    }
  })
}
const parseurChamps = (champs: Champ[]) => {
  return champs.map((champ, i) => {
    return {
      create: {
        nom: champ.nomChamps,
        obligatoire: true,
        ordre: i,
        constraint: {
          connect: {
            contrainte_id: champ.contrainteChamps.contrainte_id,
          }
        }
      }
    }
  })
}
app.post('/api/sheetModal', async (req: Request, res: Response) => {

 const sheet: Groupeinter[] = req.body

  console.log('sheet', sheet[0].champs)

 try {

  const resPrisma = await prisma.sheet.create({
    data: {
      nom: "defaultname",
      groupe: {
        createMany: {
          data: parseurGroupe(sheet)
        }
      }
    }
  })

  console.log('resPrisma', resPrisma)
  
 } catch (error) {
  res.status(404)
  console.log('error', error)
 }
 res.status(200)
});

app.get('/api/recherche', async (req: Request, res: Response  ) => {

  const allrecherche = await prisma.sheet.findMany()
  return res.status(200).json(allrecherche);

});




