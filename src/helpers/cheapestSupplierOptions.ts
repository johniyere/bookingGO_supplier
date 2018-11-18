import { retrieveSupplierInfo } from "./retrieveData";
import { limitOptions } from "./limitOptions";
import { getCheapestCartType } from "./cheapestCarTypes";
import { isSupplierResponse } from "./Responses";

export async function getCheapestSupplierOptions(pickup: string, dropoff: string, no_of_passengers?: number) {
  const data = await retrieveSupplierInfo(pickup, dropoff);
  const validResponses = data.filter(isSupplierResponse)

  const limitedOptions = (no_of_passengers) ? validResponses.map((supplier) => {
    const options = limitOptions(supplier.options, no_of_passengers)
    supplier.options = options;
    return supplier
  }) : validResponses;

  const cheapestCarTypes =  getCheapestCartType(limitedOptions);

  return cheapestCarTypes;
}