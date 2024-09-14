const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const drawingRoutes = require('./routes/drawingRoutes');
const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/whiteboard').then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/drawings', drawingRoutes);  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
