import express from 'express'
const router = express.Router()

import { affichageConstraint, createConstraint, deleteConstraint, updateConstraint } from './constraint.middleware'

router.post('/', createConstraint)

router.put('/:id', deleteConstraint)

router.get('/', affichageConstraint)

router.put('/:id', updateConstraint)

module.exports = router