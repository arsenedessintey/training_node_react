import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

interface Constraint {
  nom: string
  type: string
  regex: string 
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
  const nom:string = (req.body.nom);
  const type:string = (req.body.type);
  const regex:string = (req.body.regex);

  tabCon.push({nom: nom, type: type, regex: regex});

  console.log(tabCon)
  
  return res.status(200).send("Contrainst added");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Print a message indicating that the server is running and specify the URL
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const tabCon : Constraint[]= [];

console.log(tabCon)

