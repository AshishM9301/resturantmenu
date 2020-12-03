const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { mongoURI } = require('./config/keys');

const orderRoutes = require('./routes/order');

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database got connected'))
  .catch((err) => console.log(err));

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

app.get('/', (req, res) => {
  console.log('Hello');
});

app.use('/api/order', require('./routes/order'));
app.use('/api/like', require('./routes/like'));
app.use('/api/feedback', require('./routes/feedback'));

if (process.env.NODE_ENV === 'production') {
  // Set Static Folder

  app.use(express.static('client/build'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is Running on port ${port}`));
