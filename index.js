require('./config/config');
// Main starting point of our application
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db/mongoose');
const router = require('./router');

const app = express();



// App Setup
app.use(cors());
app.use(session({
  secret: 'top-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
router(app);

app.use(express.static(path.resolve(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Server Setup
const port = process.env.PORT
app.listen(port, () => {
  console.log('Server listening on:', port);
});