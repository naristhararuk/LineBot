
const linebot = require('../index.js');
//const bot = linebot();
// const bot = linebot({
//   channelId: process.env.CHANNEL_ID,
//   channelSecret: process.env.CHANNEL_SECRET,
//   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
// });
const bot =linebot({
  channelId: '1561292790',
  channelSecret: 'dd019042a09779942b5a37df9eb9ebcc',
  channelAccessToken: 't4HDZwX7selnnQ/vcem6TPzmtfzHZRqEaFQeMbzsbtXMe6shTIMqAwWAmBlVRdUvoKagcL6Ou32MVyLdsWQf2njd/asEoKwUrTrzwk4gJM2egh59vpSHeMO5EKQN55vaOOayJeFGywhven08q0eK9AdB04t89/1O/w1cDnyilFU=',
  verify: true // default=true
});
bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    console.log('Success', data);
  }).catch(function (error) {
    console.log('Error', error);
  });
});

bot.listen('/linewebhook', process.env.PORT || 80, function () {
  console.log('LineBot is running.');
});