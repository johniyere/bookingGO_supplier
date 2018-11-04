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