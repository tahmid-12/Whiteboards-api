const express = require('express');
const router = express.Router();
const drawingController = require('../controllers/drawingController');

router.post('/', drawingController.createDrawing);

router.get('/', drawingController.getAllDrawings);

router.get('/:id', drawingController.getDrawingById);

router.put('/:id', drawingController.updateDrawing);

router.delete('/:id', drawingController.deleteDrawing);

module.exports = router;