import { prisma } from "..";
import express, { Express, Request, Response } from 'express';
import { CreateRegex } from "./constraint.service";
import { Prisma } from "@prisma/client";



const createConstraint = ((req: Request, res: Response) => {

    //Regex
    const reqRegex = req.body;
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
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002' && error.meta?.target === "Contrainte_nom_key"){
        // The .code property can be accessed in a type-safe manner
        console.log('error.meta.target :>> ', error.meta.target);
        res.status(404).send("Not unique const name");

      }else{
        console.log(error)
        return res.status(404).send("Contrainst not add");
      }
    })
});


const deleteConstraint = ((req: Request, res: Response) => {

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


const affichageConstraint = (req: Request, res: Response  ) => {

    prisma.contrainte.findMany(
      {
        where: {
          activation: true
        }
      }
    ).then(allConstraint => {
      return res.status(200).json(allConstraint);
    })
      .catch(error => {
        console.log('error :>> ', error);
        return res.status(200).send("error find constraint");
      })
  
  };

const updateConstraint = ((req: Request, res: Response) => {

    const id:number = Number(req.params.id);
  
    const nom:string = (req.body.nom);
    const type:string = (req.body.type_contrainte);
    const reqRegex = req.body;
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

  export {
     affichageConstraint,
     createConstraint,
     deleteConstraint,
     updateConstraint
  }
  