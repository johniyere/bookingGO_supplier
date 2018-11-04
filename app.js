const https = require('https');
const prompt = require('prompt');
 
//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: username and email
//
prompt.get(['latitude1', 'longitude1', 'latitude2', 'longitude2'], function (err, result) {
  //
  // Log the results.
  //
  console.log('Pickup Location');
  console.log('  latitude: ' + result.latitude1);
  console.log('  longitude: ' + result.longitude1);
  console.log('Dropoff Location');
  console.log('  latitude: ' + result.latitude2);
  console.log('  longitude: ' + result.longitude2);
  
  const apiString = getApiString(result)
  console.log(getApiString(result))
  retrieveData(apiString)
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