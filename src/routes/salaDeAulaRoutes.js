const express = require("express");
const router = express.Router();
const controller = require("../controller/salaDeAulaController");

router.get('/salasdeaula', controller.getAllSalasDeAula);
router.get('/salasdeaula/:id', controller.getSalaDeAulaById);
router.post('/salasdeaula', controller.insertSalaDeAula);
router.put('/salasdeaula/:id', controller.updateSalaDeAula);
router.delete('/salasdeaula/:id', controller.deleteSalaDeAula);

module.exports = router;