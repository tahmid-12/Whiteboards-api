const Drawing = require('../models/drawingModel');

exports.createDrawing = async (req, res) => {
    try {
        const { type, startPoint, endPoint, center, radius, shapeType, borderColor, borderThickness, fillColor, position, content, fontSize, color, fontStyle, thickness } = req.body;

        let newDrawing = {
            type,
            borderColor,
            borderThickness,
            fillColor,
        };

        switch (type) {
            case 'line':
                if (!startPoint || !endPoint) {
                    return res.status(400).json({ message: 'Line requires startPoint and endPoint.' });
                }
                newDrawing.startPoint = startPoint;
                newDrawing.endPoint = endPoint;
                break;
            case 'circle':
                if (!center || !radius) {
                    return res.status(400).json({ message: 'Circle requires center and radius.' });
                }
                newDrawing.center = center;
                newDrawing.radius = radius;
                break;
            case 'rectangle':
                if (!startPoint || !endPoint) {
                    return res.status(400).json({ message: 'Rectangle requires startPoint and endPoint.' });
                }
                newDrawing.startPoint = startPoint;
                newDrawing.endPoint = endPoint;
                newDrawing.shapeType = shapeType; 
                break;
            case 'text':
                if (!content || !position || !fontSize || !color) {
                    return res.status(400).json({ message: 'Text requires content, position, fontSize, and color.' });
                }
                newDrawing.content = content;
                newDrawing.position = position;
                newDrawing.fontSize = fontSize;
                newDrawing.color = color;
                newDrawing.fontStyle = fontStyle; 
                break;
            default:
                return res.status(400).json({ message: 'Invalid drawing type' });
        }

        const drawing = new Drawing(newDrawing);
        await drawing.save();

        res.status(201).json(drawing);
    } catch (error) {
        res.status(400).json({ message: 'Error creating drawing', error });
    }
};

exports.getAllDrawings = async (req, res) => {
    try {
        const drawings = await Drawing.find();
        res.json(drawings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drawings', error });
    }
};

exports.getDrawingById = async (req, res) => {
    try {
        const drawing = await Drawing.findById(req.params.id);
        if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
        res.json(drawing);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drawing', error });
    }
};

exports.updateDrawing = async (req, res) => {
    try {
        const { type, ...updateData } = req.body;

        if (type === 'circle' && (!updateData.center || !updateData.radius)) {
            return res.status(400).json({ message: 'Circle requires center and radius.' });
        }
        if (type === 'line' && (!updateData.startPoint || !updateData.endPoint)) {
            return res.status(400).json({ message: 'Line requires startPoint and endPoint.' });
        }
        if (type === 'rectangle' && (!updateData.startPoint || !updateData.endPoint)) {
            return res.status(400).json({ message: 'Rectangle requires startPoint and endPoint.' });
        }
        if (type === 'text' && (!updateData.content || !updateData.position || !updateData.fontSize || !updateData.color)) {
            return res.status(400).json({ message: 'Text requires content, position, fontSize, and color.' });
        }

        const drawing = await Drawing.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
        res.json(drawing);
    } catch (error) {
        res.status(400).json({ message: 'Error updating drawing', error });
    }
};

exports.deleteDrawing = async (req, res) => {
    try {
        const drawing = await Drawing.findByIdAndDelete(req.params.id);
        if (!drawing) return res.status(404).json({ message: 'Drawing not found' });
        res.json({ message: 'Drawing deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting drawing', error });
    }
};