import { askQuestions } from "./helpers/promptUser";
import { retrieveData } from "./helpers/retrieveData";
import { isSupplierResponse } from "./helpers/Responses";
import { limitOptions } from "./helpers/limitOptions";
import { allInputsProvided } from "./helpers/validators";

function stringifyLocation(latitude: string, longitude: string) {
  return `${latitude},${longitude}`
}

(async function cliLauncher() {
  try {
    const results = await askQuestions();
    
    if (!allInputsProvided(results)) {
      throw new Error('Invalid Inputs')
    } 
    const pickup = stringifyLocation(results.pickupLatitude, results.pickupLongitude);
    const dropoff = stringifyLocation(results.dropoffLatitude, results.dropoffLongitude);
    const supplierResponse = await retrieveData('dave', pickup, dropoff)

    if (!isSupplierResponse(supplierResponse))
      throw supplierResponse

    const validOptions = (results.no_of_passengers) ? limitOptions(supplierResponse.options, results.no_of_passengers) : supplierResponse.options
    validOptions.forEach((option) => {
      console.log(`${option.car_type} - ${option.price}`)
    })
  } catch (error) {
    console.log(error)
  }
})();