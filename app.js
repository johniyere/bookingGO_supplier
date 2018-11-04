const https = require('https');
const prompt = require('prompt');
const colors = require("colors");

prompt.message = ""
prompt.delimiter = colors.green(":");

prompt.start();

prompt.get({
  properties: {
    pickupLatitude: {
      description: colors.magenta("Pickup Location\n latitude")
    },
    pickupLongitude: {
      description: colors.magenta(" longitude")
    },
    dropOffLatitude: {
      description: colors.magenta("Dropoff Location\n latitude")
    },
    dropOffLocation: {
      description: colors.magenta(" longitude")
    },
    no_of_passengers: {
      description: colors.magenta("Number of Passengers")
    }
  }
}, function (err, result) {
  console.log(result)
});


function getApiString(result) {
  const pickupLocation = `${result.latitude1},${result.longitude1}`;
  const dropOffLocation = `${result.latitude2},${result.longitude2}`;
  return `https://techtest.rideways.com/dave?pickup=${pickupLocation}&dropoff=${dropOffLocation}`
}

function retrieveData(apiString) {
  https.get(apiString, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      let result = JSON.parse(data);
      console.log(result)
      result.options.forEach(option => {
        let output = `${option.car_type} - ${option.price}`;
        console.log(output);
      });
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}