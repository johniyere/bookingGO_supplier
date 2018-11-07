import { SupplierResponse } from "./SupplierResponse";

export function getCheapestCartType(suppliers: SupplierResponse[]) {
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