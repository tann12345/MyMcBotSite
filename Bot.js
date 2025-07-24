const mineflayer = require('mineflayer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let bot = mineflayer.createBot({
  host: 'localhost', // Minecraft server IP
  port: 25565,       // Default Minecraft port
  username: 'Bot123'
});

app.use(bodyParser.json());

app.post('/command', (req, res) => {
  const command = req.body.command;
  console.log('Received command:', command);

  if (command.toLowerCase().includes('kill')) {
    const playerName = command.split('kill')[1].trim();
    const target = bot.players[playerName]?.entity;
    if (target) {
      bot.chat(`Attacking ${playerName}!`);
      bot.attack(target);
    } else {
      bot.chat(`Player ${playerName} not found.`);
    }
  } else {
    bot.chat(command);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Bot command server running on port ${PORT}`);
});
