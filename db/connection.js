const monk = require('monk');

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://Alex_b:1234zxcv@cluster0.i49sp.mongodb.net/pokerplan';
const db = monk(connectionString);

const {Users} = require('./users');
const {Tasks} = require('./tasks');

const usersDB = db.get('users');
const tasksDB = db.get('tasks');

const users = new Users(usersDB);
const tasks = new Tasks(tasksDB);

module.exports = {
  users,
  tasks
};
