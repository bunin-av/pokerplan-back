const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const users = require('./db/users');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({
    message: 'Behold The MEVN Stack!'
  });
});


app.get('/users', (req, res) => {
  users.getAll().then((users) => {
    res.json(users);
  });
});


app.post('/users', (req, res) => {
  console.log(req.body);
  users.logIn(req.body).then((user) => {
    res.json(user);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});


app.patch('/users', (req, res) => {
  console.log(req.body);
  users.pickCard(req.body).then(r => {
    console.log(r)
    res.json(req.body);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});


