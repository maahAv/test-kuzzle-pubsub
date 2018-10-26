const
  mqtt = require('mqtt'),
  client = mqtt.connect({host: 'localhost'});

client.on('connect', () => {
	console.log('connected');
  client.subscribe('kuzzle/receive')
  // Sending a volatile message
	client.publish('Kuzzle/send', JSON.stringify({
	  index: 'index',
	  collection: 'collection',
		controller: 'realtime',
		action: 'publish',
		requestId: 'some unique ID',
		body: { some: "message" }
	}));
})

// Getting Kuzzle's response
client.on('message', (topic, raw) => {
	console.log('message');
  const message = JSON.parse(Buffer.from(raw));
  console.log(topic);
  // API results topic
  if (topic === 'Kuzzle/receive') {
    // Response to our "publish" request
    if (message.requestId === 'some unique ID') {
      console.log('Message publication result: ', message);
    }
  }
});
