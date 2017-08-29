require('./config/config');
// Main starting point of our application
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db/mongoose');
const router = require('./router');

const app = express();

app.use(express.static("client/build"));

// App Setup
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT
app.listen(port, () => {
  console.log('Server listening on:', port);
});