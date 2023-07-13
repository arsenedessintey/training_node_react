import { prisma } from "..";
import express, { Express, Request, Response } from 'express';
import { Groupeinter, Recherches } from "../type/type";
import { Prisma } from "@prisma/client";
import { parseurTabChoix } from "./dossier.service";

const createDossier = async (req: Request, res: Response) => {

    const groupenom = req.body.nomDossier
  
    await prisma.dossier.create({
      data:{
        nom: groupenom,
        activationdoss:true,
      }
    }
    )      
    .then((dossier) => {
      console.log('sheet :>> ', dossier);
      res.status(200).send("new doss create");
    })
    .catch(error => {
      console.log('error', error)
      res.status(404).send("Error doss creation");
    })
  
  }
  
const rechercheDossier = async (req: Request, res: Response) => {
  
    const allDossier = await prisma.dossier.findMany({
      where:{
        activationdoss:true,
      }
    })
    return res.status(200).json(allDossier);
  
  }
  
const deleteDossier = async (req: Request, res: Response) => {
  
    const idDossier:number = Number(req.params.id);
  
    await prisma.dossier.update({
      where:{
        dossier_id: idDossier
      },
      data:{
        activationdoss:false,
      }
  
    })  
    .then((dossier) => {
      console.log('sheet :>> ', dossier);
      res.status(200).send("new doss create");
    })
    .catch(error => {
      console.log('error', error)
      res.status(404).send("Error doss creation");
    })
}

const connectFicheDoss = async (req: Request, res: Response) => {

    const tabChoix = req.body.tab
    const dossier:number = Number(req.params.idDossier);
  
    await prisma.dossier.update({
      where:{
        dossier_id: dossier
      },
      data:{
        sheet:{ 
          connect: parseurTabChoix(tabChoix)
  
      }
        
      }
  
    })  
    .then((dossier) => {
      console.log('sheet :>> ', dossier);
      res.status(200).send("new doss create");
    })
    .catch(error => {
      console.log('error', error)
      res.status(404).send("Error doss creation");
    })
  }
  
  const parseurDisco = (sheet: Recherches[]) => {
    return sheet.map((shee) => {
      return {
          sheet_id:shee.sheet_id
        }
    })
  }
  
const disconnectFicheDoss = async (req: Request, res: Response) => {
  
    const sheet = req.body.sheet
    const dossier:number = Number(req.params.idDossier);
  
    await prisma.dossier.update({
      where:{
        dossier_id: dossier
      },
      data:{
        sheet:{ 
          disconnect: parseurDisco(sheet)
  
      }
        
      }
  
    })
    .then((dossier) => {
      console.log('sheet :>> ', dossier);
      res.status(200).send("new doss create");
    })
    .catch(error => {
      console.log('error', error)
      res.status(404).send("Error doss creation");
    })
  }
  
const affichageDossier = async (req: Request, res: Response) => {
  
    const dossier_id: number = Number(req.params.idDossier);
  
      const AffichageDossier = await prisma.dossier.findUnique({
        where: {
          
          dossier_id:dossier_id

        },
        select: {
          sheet : {
            where: {
              activationSheet: true
            }
          }
        }
      })
      return res.status(200).json(AffichageDossier);
  
  }

export {
    affichageDossier,
    disconnectFicheDoss,
    connectFicheDoss,
    deleteDossier,
    rechercheDossier,
    createDossier,
}