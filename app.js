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