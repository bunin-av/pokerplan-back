const Joi = require('joi');
const db = require('./connection');


const schemaTasks = Joi.array().required();


const tasks = db.get('tasks');

tasks.remove({});

function getAllTasks() {
  return tasks.find();
}

async function logIn(user) {
  if (!user.name) user.name = 'Anonymous';

  const result = schemaName.validate(user);
  if (result.error == null) {
    user.logged = new Date();
    user.picked = null;
    return users.insert(user);
  } else {
    return result.error;
  }
}

async function pickCard({name, picked}) {
  const result = schemaCard.validate(picked);

  if (result.error == null) {
    return users.update({name}, {$set:{picked}});
  } else {
    return result.error;
  }
}

async function postTasks(tasks) {
  const result = schemaTasks.validate(tasks);

  if (result.error == null) {
    return users.update({name}, {$set:{picked}});
  } else {
    return result.error;
  }
}


module.exports = {
  logIn,
  getAll,
  pickCard,
};
