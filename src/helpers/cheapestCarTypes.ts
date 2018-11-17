import { SupplierResponse, CarTypes } from "./Responses";

export function getCheapestCartType(suppliers: SupplierResponse[]) {
  let car_type_max: CarTypes = {
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

  const validCarTypes = returnValidCarTypes(car_type_max)

  return validCarTypes;
}

function returnValidCarTypes(carTypes: CarTypes) {
  let validCarTypes: CarTypes = {};

  for (var key in carTypes) {
    if (carTypes[key].supplier != 'M')
      validCarTypes[key] = carTypes[key];
  }

  return validCarTypes
}