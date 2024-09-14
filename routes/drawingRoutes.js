const express = require('express');
const router = express.Router();
const drawingController = require('../controllers/drawingController');

// Create a new drawing
router.post('/', drawingController.createDrawing);

// Get all drawings
router.get('/', drawingController.getAllDrawings);

// Get a drawing by ID
router.get('/:id', drawingController.getDrawingById);

// Update a drawing
router.put('/:id', drawingController.updateDrawing);

// Delete a drawing
router.delete('/:id', drawingController.deleteDrawing);

module.exports = router;