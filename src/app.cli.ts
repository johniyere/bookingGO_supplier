import { askQuestions } from "./promptUser";
import { getCheapestSupplierOptions } from "./cheapestSupplierOptions";

function stringifyLocation(latitude: string, longitude: string) {
  return `${latitude},${longitude}`
}

function printResults(options: {[s: string]: {supplier: string, price: number}}) {
  for (var key in options) {
    if (options[key].supplier != 'M')
      console.log(`${key} - ${options[key].supplier} - ${options[key].price}`);
  }
}

(async function cliLauncher() {
  try {
    const results = await askQuestions();
    const pickup = stringifyLocation(results.pickupLatitude, results.pickupLongitude);
    const dropoff = stringifyLocation(results.dropoffLatitude, results.dropoffLongitude);
    const cheapestSupplierOptions = await getCheapestSupplierOptions(pickup, dropoff, results.no_of_passengers);

    printResults(cheapestSupplierOptions);
  } catch (error) {
    console.log(error)
  }
})();

