const https = require('https');

const apiString = "https://techtest.rideways.com/dave?pickup=3.410632,-2.157533&dropoff=3.410632,-2.157533"

https.get(apiString, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});