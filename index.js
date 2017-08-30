require('./config/config');
// Main starting point of our application
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db/mongoose');
const router = require('./router');

const app = express();

app.use(express.static(path.resolve(__dirname, 'client', 'build')));

// App Setup
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Server Setup
const port = process.env.PORT
app.listen(port, () => {
  console.log('Server listening on:', port);
});