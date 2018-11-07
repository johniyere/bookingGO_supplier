import {PromptObject, prompt} from "prompts";
import { retrieveSupplierInfo } from "./retrieveData";
import axios from "axios";
import { askQuestions } from "./promptUser";
import { limitOptions } from "./limitOptions";
import { SupplierResponse } from "./SupplierResponse";
import { getCheapestCartType } from "./getChepestCartypes";

function stringifyLocation(latitude: string, longitude: string) {
  return `${latitude},${longitude}`
}

async function callMe() {

  try {

  
    const results = await askQuestions();
    const pickup = stringifyLocation(results.pickupLatitude, results.pickupLongitude)
    const dropoff = stringifyLocation(results.dropoffLatitude, results.dropoffLongitude)
    
    
    const supplierResponses = await retrieveSupplierInfo(pickup, dropoff)

    console.log(supplierResponses)
  } catch (err) {
    console.error(err)
  }
    
  // console.log(supplierResponses)
  // const limitedOptions = supplierResponses.map((supplier) => {
  //   const options = limitOptions(supplier.options, results.no_of_passengers)
  //   supplier.options = options;
  //   return supplier
  // })
  // console.log(limitedOptions)
  // let cheapest = getCheapestCartType(limitedOptions);
  // printResults(cheapest)
  
}

callMe()

function printResults(options: {[s: string]: {supplier: string, price: number}}) {
  for (var key in options) {
    if (options[key].supplier != 'M')
      console.log(`${key} - ${options[key].supplier} - ${options[key].price}`);
  }
}
