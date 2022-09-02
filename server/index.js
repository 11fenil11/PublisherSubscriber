import { App } from "@tinyhttp/app";
import { json } from "milliparsec";
import Redis from "ioredis";

const app = new App();
const redisSub = new Redis(); //client for Redis Subscriber
const redisPub = new Redis(); //client for Redis Publisher

app.use(json());

var messages = []; //messages stored in server to forward them to URL:http://localhost:8000/event
var URL; // subscriber URL

//route to accept post requests to publish messages in specified topic
//Request format: http://localhost:8000/publish/{TOPIC} body: {message: <message>}
app.post("/publish/:TOPIC", (req, res) => {
  const topic = req.params.TOPIC;
  redisPub.publish(topic, JSON.stringify({ ...req.body })); //publishing message to subscribers of channel topic
  return res.status(200).send(`new message published in topic: ${topic}.`);
});

//route to accept post requests to subscriber to the specified topic
//Request format: http://localhost:8000/subscriber/{TOPIC} body: {url: <URL>}
app.post("/subscribe/:TOPIC", (req, res) => {
  const topic = req.params.TOPIC;
  URL = req.body.url; //storing URL to global variable
  //subscribing this subscriber client to specified channel
  redisSub.subscribe(topic, (err, count) => {
    if (err) console.error(err.message);
    console.log(`Subscriber: Subscribed to ${count} channels.`);
  });
  return res.status(200).send(`Subscribed ${URL} to topic: ${topic}`);
});

//route to accept get requests to event
//Request format: http://localhost:8000/event/
app.get("/event", (req, res) => {
  res.json({ messages: messages });
});

//main function is fetching the published message
const main = () => {
  //keep looking for any new message in specified channel and add it to the list
  redisSub.on("message", (channel, message) => {
    message = JSON.parse(message);
    console.log(
      `Received message: ${message.message} from ${channel} channel.`
    );
    messages.push(message.message); //adding message to the memory of server so that forwarding it to /event can be possible
  });
};

main();//calling main function
app.listen(8000);
