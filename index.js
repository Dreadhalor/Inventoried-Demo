const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

const port = 3000;
const app = express();

mongoose.connect(
  config.database,
  { useNewUrlParser: true}
);
mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${config.database}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

//CORS middleware
app.use(cors());
//body-parse middleware
app.use(bodyParser.json());

//initialize routes
const settings = require('./routes/settings');
app.use('/settings', settings);
const assets = require('./routes/assets');
app.use('/assets', assets);

app.get('/', (req, res, next) => {
  res.send('hello world');
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});