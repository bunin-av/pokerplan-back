const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const events = require('events');

const {users, tasks} = require('./db/connection');

const app = express();

const emitter = new events.EventEmitter();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());


app.get('/connection', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  emitter.on('update-data', (event = 'users', {data} = {}) => {
    const clientEvent = {
      event,
      data
    };

    if (event === 'users') {
      users.getAll().then((users) => {
        clientEvent.data = users;
        res.write(`data: ${JSON.stringify(clientEvent)} \n\n`);
      });
    }

    if (event === 'tasks') {
      tasks.getAll().then((tasks) => {
        clientEvent.data = tasks;
        res.write(`data: ${JSON.stringify(clientEvent)} \n\n`);
      });
    }
  });
});


app.get('/users', (req, res) => {
  users.getAll().then((users) => {
    res.json(users);
  });
});


app.post('/users', (req, res) => {
  users.logIn(req.body).then((user) => {
    emitter.emit('update-data');
    res.json(user);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});


app.patch('/users', (req, res) => {
  users.pickCard(req.body).then(() => {
    emitter.emit('update-data');
    res.json(req.body);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});


app.delete('/users', (req, res) => {
  users.nullResults()
    .then(
      () => {
        res.status(200).send('Results deleted');
        emitter.emit('update-data', 'users');
      },
      () => res.status(500)
    );
});


app.delete('/user', (req, res) => {
  users.deleteUser(req.body)
    .then(
      () => {
        res.status(200).send('User deleted');
        emitter.emit('update-data', 'users');
      },
      () => res.status(500)
    );
});


app.get('/tasks', (req, res) => {
  tasks.getAll().then((users) => {
    res.json(users);
  });
});


app.post('/tasks', (req, res) => {
  tasks.addTasks(req.body).then((tasks) => {
    emitter.emit('update-data', 'tasks');
    res.json(tasks);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});


app.delete('/tasks', (req, res) => {
  tasks.deleteTask(req.body)
    .then(
      () => {
        res.status(200).send('Task deleted');
        emitter.emit('update-data', 'tasks');
      },
      () => res.status(500)
    );
});


app.get('/new-game', (req, res) => {
  Promise.all([users.startNewGame(), tasks.startNewGame()]).then(()=> {
    res.status(200).send('New game started');
  });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
