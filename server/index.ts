import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

interface Constraint {
  nom: string
  type: string
  regex: string 
  id:string
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

app.post('/api/constraint', (req: Request, res: Response) => {
  const id:string = (req.body.id);
  const nom:string = (req.body.nom);
  const type:string = (req.body.type);
  const regex:string = (req.body.regex);

  tabCon.push({nom: nom, type: type, regex: regex, id: id});
  return res.status(200).send("Contrainst added");
});

app.delete('/api/constraint/:id', (req: Request, res: Response) => {
  const id:string = (req.params.id);
  tabCon = tabCon.filter((constraints) => {
    return constraints.id !== id
  });
  
  return res.status(200).send("Contrainst suppr");

});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Print a message indicating that the server is running and specify the URL
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


app.get('/api/tabCon', (req: Request, res: Response  ) => {
return res.status(200).json(tabCon);

});

let tabCon : Constraint[]= [
  {id:"85498454", nom: "oidhvuoqdgb", type: "free", regex: "oudhuozehgo"}
];


