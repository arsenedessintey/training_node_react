import express from 'express'
import { affichageConstraint, createConstraint, deleteConstraint, updateConstraint } from './constraint.middleware'


export const router = express.Router()

router.post('/', createConstraint)
router.put('/delete/:id', deleteConstraint)
router.get('/get', affichageConstraint)
router.put('/update/:id', updateConstraint)