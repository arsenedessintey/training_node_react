import express from 'express'
import { deleteSheet, updateModelSheet, allSelectSheet, recupSheet, updateSheet, rechercheSheet, affichageSheet, createSheet, } from './Sheet.middleware'


export const router = express.Router()

router.post('/sheetModel', createSheet)
router.put('/switchVersion/:sheetID', affichageSheet)
router.put('/DesacSheet/:id', deleteSheet)
router.get('/recherche', rechercheSheet)
router.get('/modifyS/:sheet_id', updateSheet)
router.get('/allSheet/:idrecherche', recupSheet)
router.get('/allSheetSelect', allSelectSheet)
router.delete('/sheetModelModif/:sheetId', updateModelSheet)