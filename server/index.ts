import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Contrainte, PrismaClient, Sheet } from '@prisma/client';

interface Groupeinter {
  idg: number
  nom: string
  champs: Champ[]
}

export type ChildSheet = {
  sheet_id: number
  nom : string
}

interface Champ {
  idc: number
  nom: string
  constraint: Constraint
  obligatoire:boolean
}

export interface Constraint {

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
      activation: true
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

app.put('/api/constraintDel/:id',  (req: Request, res: Response) => {

  const id:number = Number(req.params.id);

    prisma.contrainte.update({
    where: {
      contrainte_id: id,
    },
    data: {
      activation: false,
    }
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

  prisma.contrainte.findMany(
    {
      where: {
        activation: true
      }
    }
  ).then(allConstraint => {
    console.log('allConstraint :>> ', allConstraint);
    return res.status(200).json(allConstraint);
  })
    .catch(error => {
      console.log('error :>> ', error);
      return res.status(200).send("error find constraint");
    })

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

const parseurGroupe = (groupes: Groupeinter[]) => {
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
    return {
        nom: champ.nom,
        obligatoire: champ.obligatoire,
        ordre: i,
        constraintId: champ.constraint.contrainte_id
      }
  })
}

// const parseurChildSheet =

app.post('/api/sheetModel', async (req: Request, res: Response) => {
  const groupes: Groupeinter[] = req.body.groupe;
  const nomFicheS: string = req.body.nomFicheS
  const descFicheS: string = req.body.descFicheS
  const childSheet: ChildSheet[] = req.body.lienSFS
  const activationSheetconst: boolean = req.body.activationSheet
  const nomVersionconst:string = req.body.nomVersion

  const childSheetId = childSheet?.map(c => ({ sheet_id: c.sheet_id }))

  try {
    const sheets = await prisma.sheet.create({
      data: {
        nom: nomFicheS,
        description: descFicheS,
        activationSheet:activationSheetconst,
        nomVersion:nomVersionconst,
        childSheet: {
          connect: childSheetId
        },
        groupe: {
          create: parseurGroupe(groupes)
        }
      },
      include: {
        groupe: {
          include: { champs: true }
        }
      }
    })
  } catch (error) {
    console.log('error', error)
    res.status(404).send("Error sheet creation");
  }
  res.status(200).send("new sheet created");
});

app.get('/api/recherche', async (req: Request, res: Response  ) => {

  const allrecherche = await prisma.sheet.findMany()
  return res.status(200).json(allrecherche);

});

app.get("/api/modifyS/:sheet_id", async (req: Request, res: Response) => {

  const sheet_id: number = Number(req.params.sheet_id);

  try {
    const modifyFich = await prisma.sheet.findUnique({
      where: {
        sheet_id: sheet_id
      },
      include: {
        groupe: {
          include: {
            champs: {
              include: {
                constraint: true
              }
            }
          }
        },
        childSheet: true
      }
    })

    const sendsheet = JSON.stringify(modifyFich)
    return res.status(200).json(sendsheet)
  } catch (error) {
    console.log('error :>> ', error);
  }

  return res.status(404).send("Error insertion fiche");
})

app.get("/api/allSheet", async (req: Request, res: Response) => {

  const allSheet = await prisma.sheet.findMany()
  return res.status(200).json(allSheet);

})





