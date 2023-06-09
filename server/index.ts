import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Contrainte, PrismaClient } from '@prisma/client';


export const prisma = new PrismaClient();

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


  const nom:string = (req.body.nom);
  const type:string = (req.body.type_contrainte);
  const regex:string = (req.body.valeur_regex);

  console.log(regex)

  prisma.contrainte.create({
    data: {
      nom: nom,
      type_contrainte: type,
      valeur_regex: regex,
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
  console.log(req.params.id)
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

  // console.log(id)

  const nom:string = (req.body.nom);
  const type:string = (req.body.type_contrainte);
  const regex:string = (req.body.valeur_regex);

  prisma.contrainte.update({
    where: {
      contrainte_id:id,
    },
    data:{
      nom: nom,
      type_contrainte: type,
      valeur_regex: regex,
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

// const nc  = await prisma.contrainte.findUnique({
//   where: {}
// })



