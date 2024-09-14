const Drawing = require('../models/drawingModel');

// Create a new drawing
exports.createDrawing = async (req, res) => {
    try {
        // Create a new instance of the drawing model with request body data
        const drawing = new Drawing({
            type: req.body.type,
            startPoint: req.body.startPoint,
            endPoint: req.body.endPoint,
            center: req.body.center,
            radius: req.body.radius,
            shapeType: req.body.shapeType,
            borderColor: req.body.borderColor,
            borderThickness: req.body.borderThickness,
            fillColor: req.body.fillColor,
            position: req.body.position,
            content: req.body.content,
            fontSize: req.body.fontSize,
            color: req.body.color,
            fontStyle: req.body.fontStyle,
            thickness: req.body.thickness
        });

        // Save the drawing to MongoDB
        await drawing.save();

        // Send the saved drawing as a response
        res.status(201).json(drawing);
    } catch (error) {
        res.status(400).json({ message: 'Error creating drawing', error });
    }
};

// Get all drawings
exports.getAllDrawings = async (req, res) => {
    try {
        const drawings = await Drawing.find();
        res.json(drawings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drawings', error });
    }
};

// Get a specific drawing by ID
exports.getDrawingById = async (req, res) => {
    try {
        const drawing = await Drawing.findById(req.params.id);
        if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
        res.json(drawing);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drawing', error });
    }
};

// Update a drawing
exports.updateDrawing = async (req, res) => {
    try {
        const drawing = await Drawing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
        res.json(drawing);
    } catch (error) {
        res.status(400).json({ message: 'Error updating drawing', error });
    }
};

// Delete a drawing
exports.deleteDrawing = async (req, res) => {
    try {
        const drawing = await Drawing.findByIdAndDelete(req.params.id);
        if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
        res.json({ message: 'Drawing deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting drawing', error });
    }
};