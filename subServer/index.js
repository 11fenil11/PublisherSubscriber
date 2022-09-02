// @/sub/index.js

import axios from "axios";
import Redis from "ioredis";

const redis = new Redis();

const main = () => {
  redis.subscribe("send-user-data", (err, count) => {
    if (err) console.error(err.message);
    console.log(`Subscribed to ${count} channels.`);
  });

  redis.on("message", (channel, message) => {
    console.log(`Received message from ${channel} channel.`);
    console.log(JSON.parse(message));    
  });
  // axios.post("http://localhost:8000/event", {
  //       message: "hello"
  //   }).then((result)=>{
  //     console.log(result.data);      
  //   }).catch((err)=>{
  //     console.error(err);
  //   })
};

main();