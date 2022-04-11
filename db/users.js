const db = require('./connection');

const users = db.get('users');

users.remove({});

function getAll() {
  return users.find();
}

async function logIn(user) {
  if (!user.name) user.name = 'Anonymous';

    user.picked = null;
    return users.insert(user);
}

async function pickCard({name, picked}) {
  return users.update({name}, {$set: {picked}});
}

async function nullResults() {
  return users.update({}, {$set: {picked: null}}, {multi: true});
}

async function startNewGame() {
  return users.remove({});
}


module.exports = {
  logIn,
  getAll,
  pickCard,
  nullResults,
  startNewGame,
};
