import {PromptObject, prompt} from "prompts";
import { retrieveSupplierInfo } from "./retrieveData";
import axios from "axios";
import { askQuestions } from "./promptUser";
import { limitOptions } from "./limitOptions";
import { SupplierResponse } from "./SupplierResponse";

function stringifyLocation(latitude: string, longitude: string) {
  return `${latitude},${longitude}`
}

async function callMe() {

  const results = await askQuestions();
  const pickup = stringifyLocation(results.pickupLatitude, results.pickupLongitude)
  const dropoff = stringifyLocation(results.dropoffLatitude, results.dropoffLongitude)
  
  const supplierResponses = await retrieveSupplierInfo(pickup, dropoff)
    
  console.log(supplierResponses)
  const limitedOptions = supplierResponses.map((supplier) => {
    const options = limitOptions(supplier.options, results.no_of_passengers)
    supplier.options = options;
    return supplier
  })
  console.log(limitedOptions)
  let cheapest = getCheapers(limitedOptions);
  printResults(cheapest)
  
}

callMe()

function getCheapers(suppliers: SupplierResponse[]) {
  let car_type_max: {[s: string]: {supplier: string, price: number}} = {
    "STANDARD": {
      supplier: 'M',
      price: Number.MAX_SAFE_INTEGER
    },
    "EXECUTIVE": {
      supplier: 'M',
      price: Number.MAX_SAFE_INTEGER
    },
    "LUXURY": {
      supplier: 'M',
      price: Number.MAX_SAFE_INTEGER
    },
    "PEOPLE_CARRIER":{
      supplier: 'M',
      price: Number.MAX_SAFE_INTEGER
    },
    "LUXURY_PEOPLE_CARRIER": {
      supplier: 'M',
      price: Number.MAX_SAFE_INTEGER
    },
    "MINIBUS": {
      supplier: 'M',
      price: Number.MAX_SAFE_INTEGER
    },
  }

  suppliers.forEach((supplier) => {
    supplier.options.forEach((option) => {
      if (option.price <= car_type_max[option.car_type].price) {
        car_type_max[option.car_type].price = option.price;
        car_type_max[option.car_type].supplier = supplier.supplier_id;
      }
    })
  });

  return car_type_max;
}

function printResults(options: {[s: string]: {supplier: string, price: number}}) {
  for (var key in options) {
    if (options[key].supplier != 'M')
      console.log(`${key} - ${options[key].supplier} - ${options[key].price}`);
  }
}
