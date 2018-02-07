var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
const line = require('@line/bot-sdk');

var app = express()

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 80))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
 	res.send('Hello')
})


app.post('/webhook', (req, res) => {
  var text = req.body.events[0].message.text
  var sender = req.body.events[0].source.userId
  var replyToken = req.body.events[0].replyToken
  console.log(text , sender, replyToken)
  console.log(typeof sender, typeof text)
  // console.log(req.body.events[0])
  if (text === 'สวัสดี' || text === 'Hello' || text === 'hello') {
    sendText(sender, text)
  }
  res.sendStatus(200)
  
})
const userid = 'U05b73e948aa780cc625bdc7b948170ed'

function sendText (sender, text) {
  let data = {
    to: userid,
    messages: [
      {
        type: 'text',
        text: 'สวัสดีครับ ระบบตอบกลับอัตโนมัติ 💞'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {'+replyToken+'}'
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) { console.log('error'+data) }
    if (res) { console.log('success'+data) }
    if (body) { console.log(body+data) }
  })
}


const config = {
  channelAccessToken: '06V3hxBoYhxHgA/cn2auTpZ9EGbB6dvVQeIQJT6PW2i1uuXIAwlNj6IKzpl8zaWFoKagcL6Ou32MVyLdsWQf2njd/asEoKwUrTrzwk4gJM1ZFVeJ9HiKZsn+LaIrqqWp9rfXlkIMOVOPQafEaCJk8AdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'dd019042a09779942b5a37df9eb9ebcc'
};

const client = new line.Client(config);

app.post('/message', line.middleware(config), (req, res) => {
  Promise
      .all(req.body.events && req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

function handleEvent(event) {

  console.log(event);
  if (event.type === 'message' && event.message.type === 'text') {
      handleMessageEvent(event);
  } else {
      return Promise.resolve(null);
  }
}

function handleMessageEvent(event) {
  var msg = {
      type: 'text',
      text: 'สวัสดีครัช'
  };

  return client.replyMessage(event.replyToken, msg);
}



app.listen(app.get('port'), function () {
  console.log('run GET at port', app.get('port'))
})