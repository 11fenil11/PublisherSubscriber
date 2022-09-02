// @/pub/index.js

import { App } from "@tinyhttp/app";

import { json } from "milliparsec";
import Redis from "ioredis";
import axios from "axios";

// const App = require('@tinyhttp/app')
// const json = require('milliparsec')

const app = new App();
const redisSub = new Redis();
const redisPub = new Redis();

app.use(json());

var messages = [];

app.post("/publish", (req, res) => {
  const topic = req.params.TOPIC;
  redisPub.publish(topic, JSON.stringify({ ...req.body }));

  // redisPub.on(topic, (channel, message) => {
  //   console.log(`Publisher: Received message from ${channel} channel.`);
  //   console.log(JSON.parse(message));
  // });

  return res.sendStatus(200);
});

app.post("/subscribe", (req, res) => {
  const topic = req.params.TOPIC;
  const URL = req.body.url;
  redisSub.subscribe(topic, (err, count) => {
    if (err) console.error(err.message);
    console.log(`Subscriber: Subscribed to ${count} channels.`);
  });
  return res.status(200).send("Subscribed");
});

app.post("/event", (req, res) => {
  const message = req.body.message;
  console.log("New Message Published: ", message);
  messages.push(message);
  return res.status(200).json({
    response: "Published to /event",
    messages: messages,
  });
});

app.get("/event", (req, res) => {
  res.send(messages);
});

const main = () => {
  // redisPub.subscribe("send-user-data", (err, count) => {
  //   if (err) console.error(err.message);
  //   console.log(`Subscribed to ${count} channels.`);
  // });

  redisSub.on("message", (channel, message) => {
    console.log(`Received message from ${channel} channel.`);
    console.log(JSON.parse(message));
    
    axios
      .post("http://localhost:3000/event", {
        message: message,
      })
      .then((result) => {
        // console.log(result.data);
      })
      .catch((err) => {
        // console.error(err);
      });
  });
};

main();

app.listen(3000);
