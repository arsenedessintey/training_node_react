import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app: Express = express();
app.use(cors())
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/api', (req: Request, res: Response) => {
  console.log(`request from ${req.url}`)
  res.status(200).json({message: "Hello from server"});
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});