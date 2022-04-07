const ws = require('ws');
const users = require('./db/users');

const wss = new ws.Server({
  port: 4000,
}, () => console.log('WSS started on 4000'));

wss.on('connection', ws => {
  ws.on('message', async message => {
    message = JSON.parse(message);

    switch (message.event) {
      case 'log-in':
        await users.logIn(message.user);
        break;
      case 'pick-card':
        await users.pickCard(message.user);
        broadcastMessage(message);
    }
  })
})

function broadcastMessage(message) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  });
}
