const https = require('https');
const prompt = require('prompt');
const colors = require("colors");

prompt.message = ""
prompt.delimiter = colors.green(":");

const s = 'https://techtest.rideways.com/dave?pickup=3.410632,-2.157533&dropoff=3.410632,-2.157533';
// retrieveData(s);
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
      console.log(limitOptions(result.options, 5))
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })
}


const car_type_max = {
  "STANDARD": 4,
  "EXECUTIVE": 4,
  "LUXURY": 4,
  "PEOPLE_CARRIER": 6,
  "LUXURY_PEOPLE_CARRIER": 6,
  "MINIBUS": 16
}
function limitOptions(options, no_of_passengers) {
  const filtered = options.filter((option) => {
    return car_type_max[option.car_type] > no_of_passengers
  })
  return filtered
}

function printOptions(options) {
  options.forEach(option => {
    let output = `${option.car_type} - ${option.price}`;
    console.log(output);
  });
}