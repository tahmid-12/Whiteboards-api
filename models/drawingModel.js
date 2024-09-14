const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
    type: { type: String, required: true },
    startPoint: { x: Number, y: Number },
    endPoint: { x: Number, y: Number },
    center: { x: Number, y: Number },
    radius: Number,
    shapeType: String,
    borderColor: String,
    borderThickness: Number,
    fillColor: String,
    position: { x: Number, y: Number },
    content: String,
    fontSize: Number,
    color: String,
    fontStyle: String,
    thickness: Number
}, { timestamps: true });

module.exports = mongoose.model('Drawing', DrawingSchema);