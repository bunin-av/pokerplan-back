const Joi = require('joi');
const db = require('./connection');

const schemaName = Joi.object({
  name: Joi.string().alphanum().required(),
  // logged: Joi.string().required(),
  // ready: Joi.bool().required(),
  // message: Joi.string().max(500).required(),
  // imageURL: Joi.string().uri({
  //   scheme: [
  //     /https?/
  //   ]
  // })
});

const schemaCard = Joi.number().required();
const schemaTasks = Joi.array().required();


const users = db.get('users');

users.remove({});

function getAll() {
  return users.find();
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
