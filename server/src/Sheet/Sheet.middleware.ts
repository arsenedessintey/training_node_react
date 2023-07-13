import { prisma } from "..";
import express, { Express, Request, Response } from 'express';
import { Groupeinter } from "../type/type";
import { Prisma } from "@prisma/client";
import { parseurGroupe } from "./Sheet.service";


const createSheet = (req: Request, res: Response) => {

    const groupes: Groupeinter[] = req.body.groupe;
    const nomFicheS: string = req.body.nomFicheS
    const descFicheS: string = req.body.descFicheS
    const activationSheet: boolean = req.body.activationSheet
    const nomVersion:string = req.body.nomVersion
  
    prisma.sheet.create({
      data: {
        nom: nomFicheS,
        description: descFicheS,
        activationSheet:activationSheet,
        nomVersion:nomVersion,
        groupe: {
          create: parseurGroupe(groupes)}
      },
      include: {
        groupe: {
          include: { champs: {include: {sheet: true}} }
        },
        dossier : true
      }
    })
    .then((sheet) => {
      console.log('sheet :>> ', sheet);
      res.status(200).json(sheet);
    }).catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002' && error.meta?.target === "Sheet_nom_nomVersion_key") {
        // The .code property can be accessed in a type-safe manner
        console.log('error.meta.target :>> ', error.meta.target);
        res.status(404).send("Not unique sheet id");
        
      } else {
            console.log('error', error)
            res.status(404).send("Error sheet creation");
      }
    })
  };

const affichageSheet =(req: Request, res: Response) => {

    const sheetID:number = Number(req.params.sheetID)
    const newSheetId: number = Number(req.query.newSheetId);

    if(isNaN(newSheetId) || isNaN(sheetID))
      return res.status(404).send("Error sheet creation");

      prisma.sheet.update({
        where:{
          sheet_id: sheetID,
        },
        data:{
          activationSheet:false,
        },
        include: {
          dossier: true
        }
      })
    .then((sheet) => {
      console.log('sheet :>> ', sheet);

      if(!sheet.dossier_id)
        return res.status(200).send("new sheet change");

      prisma.dossier.update({
        where:{
          dossier_id: sheet.dossier_id ?? undefined
        },
        data:{
          sheet:{
            connect:{
              sheet_id: newSheetId
  
            },
          }
        }
      })
      .then((dossier)=>{
        console.log('dossier :>> ', dossier);
        res.status(200).send("new sheet change");
      })
      .catch(e => {
        console.log('e :>> ', e);
        res.status(400).send("new sheet not change");
      })

      
    })
    .catch(error => {
      console.log('error', error)
      res.status(404).send("Error sheet creation");
    })


}

const deleteSheet = async (req: Request, res: Response) => {

    const desacsheetID:number = Number(req.params.id)  
  
    await prisma.sheet.update({
      where:{
        sheet_id: desacsheetID
      },
      data:{
        activationSheet:false,
      }
  
    })  
    .then((DelDossier) => {
      console.log('sheet :>> ', DelDossier);
      res.status(200).send("new doss create");
    })
    .catch(error => {
      console.log('error', error)
      res.status(404).send("Error doss creation");
    })
  
}

const rechercheSheet = (req: Request, res: Response  ) => {

    prisma.sheet.findMany(
      {
        where: {
          activationSheet: true
        }
      }
    ).then(allSheet => {
      return res.status(200).json(allSheet);
    })
      .catch(error => {
        console.log('error :>> ', error);
        return res.status(200).send("error find sheet");
      })
  
  };

 const updateSheet = async (req: Request, res: Response) => {


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
        }
      })
  
      const sendsheet = JSON.stringify(modifyFich)


      return res.status(200).json(sendsheet)
    } catch (error) {
      console.log('error :>> ', error);
    }
  
    return res.status(404).send("Error insertion fiche");
  }
  
const recupSheet = async (req: Request, res: Response) => {
  
    const id_sheetNOT:number = Number(req.params.idrecherche);
  
    const allSheet = await prisma.sheet.findMany(
      {
        where: {
  
          activationSheet: true
  
        }
      }
    )
    return res.status(200).json(allSheet);
  
  }
  
const allSelectSheet = async (req: Request, res: Response) => {
  
    const allSheetSelect = await prisma.sheet.findMany(
      {
        where: {
  
          activationSheet: true
  
        }
      }
    )
    return res.status(200).json(allSheetSelect);
  
  }
  
const updateModelSheet = async (req: Request, res: Response) => {
  
    try {
      const id_sheet:number = Number(req.params.sheetId);
  
  
      await prisma.sheet.delete({
        where: {
          sheet_id: id_sheet,
        },
        })
      
      
    } catch (error) {
      console.log('error :>> ', error);
    }
    return res.status(404).send("Error Modif fiche");
  
  
  }

export {
    deleteSheet,
    updateModelSheet,
    allSelectSheet,
    recupSheet,
    updateSheet,
    rechercheSheet,
    affichageSheet,
    createSheet,
}

