import { askQuestions } from "./helpers/promptUser";
import { getCheapestSupplierOptions } from "./helpers/cheapestSupplierOptions";
import { allInputsProvided } from "./helpers/validators";

function stringifyLocation(latitude: string, longitude: string) {
  return `${latitude},${longitude}`
}

(async function cliLauncher() {
  try {
    const results = await askQuestions();
    
    if (!allInputsProvided(results)) {
      throw new Error('Not all inputs have been provided')
    } 
    const pickup = stringifyLocation(results.pickupLatitude, results.pickupLongitude);
    const dropoff = stringifyLocation(results.dropoffLatitude, results.dropoffLongitude);
    const validCarTypes = await getCheapestSupplierOptions(pickup, dropoff, results.no_of_passengers);

    for (var key in validCarTypes) {
      console.log(`${key} - ${validCarTypes[key].supplier} - ${validCarTypes[key].price}`);
    }
  } catch (error) {
    console.log(error.message)
  }
})();