const mongoose = require('mongoose');

// Subschema for points (coordinates)
const PointSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true }
});

// Main schema for drawings
const DrawingSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true, 
        enum: ['line', 'circle', 'rectangle', 'text'] // Add other shapes as needed
    },
    startPoint: PointSchema,  // Required for lines and some shapes
    endPoint: PointSchema,    // Required for lines and some shapes
    center: PointSchema,      // Required for circles
    radius: { type: Number }, // Required for circles
    shapeType: { type: String },  // For identifying specific shapes (like filled shapes)
    borderColor: { type: String, default: '#000000' },
    borderThickness: { type: Number, default: 1 },
    fillColor: { type: String },  // Optional for filled shapes
    position: PointSchema,  // Useful for text positioning
    content: { type: String },    // Content of the text for text annotations
    fontSize: { type: Number },   // Font size for text
    color: { type: String },      // Text color
    fontStyle: { type: String },  // Font style for text
    thickness: { type: Number },  // For lines or borders
}, { timestamps: true });

// The model is exported as 'Drawing'
module.exports = mongoose.model('Drawing', DrawingSchema);