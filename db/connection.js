const monk = require('monk');

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://Alex_b:1234zxcv@cluster0.i49sp.mongodb.net/pokerplan';
const db = monk(connectionString);


module.exports = db;
