import express from 'express'
import { affichageDossier, disconnectFicheDoss, connectFicheDoss, deleteDossier, rechercheDossier, createDossier, } from './dossier.middleware'


export const router = express.Router()

router.post('/createDoss', createDossier)
router.get('/DossierGet', rechercheDossier)
router.put('/DossierDel/:id', deleteDossier)
router.put('/FicheChoixCo/:idDossier', connectFicheDoss)
router.put('/FicheChoixDisco/:idDossier', disconnectFicheDoss)
router.get('/AffichageDossier/:idDossier', affichageDossier)