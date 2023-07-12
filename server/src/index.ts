import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Contrainte, PrismaClient, Prisma } from '@prisma/client';
import { connect } from 'http2';
import * as constraintController from './constraint/constraint.controller';
import * as sheetController from './Sheet/Sheet.controller'
import * as dossierController from './dossier/dossier.controller'
import { Champ, Groupeinter, Recherches } from './type/type';

export const prisma = new PrismaClient();

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the Express application
const app: Express = express();

// Apply the CORS middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Set the server port by reading the value from the PORT environment variable
const port = process.env.PORT;



app.use(express.json());

app.use('/api/constraint', constraintController.router)

app.use('/api/sheet', sheetController.router)

app.use('/api/dossier', dossierController.router)



app.listen(port, () => {
  // Print a message indicating that the server is running and specify the URL
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});









