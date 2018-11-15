import { retrieveSupplierInfo } from "./retrieveData";
import { limitOptions } from "./limitOptions";
import { getCheapestCartType } from "./getChepestCartypes";
import { isSupplierResponse } from "./SupplierResponse";

export async function getCheapestSupplierOptions(pickup: string, dropoff: string, no_of_passengers: number) {
  const data = await retrieveSupplierInfo(pickup, dropoff);
  console.log(data)
  const validResponses = data.filter(isSupplierResponse)
  console.log(validResponses);

  const limitedOptions = validResponses.map((supplier) => {
    const options = limitOptions(supplier.options, no_of_passengers)
    supplier.options = options;
    return supplier
  });
  console.log(limitedOptions);

  return getCheapestCartType(limitedOptions)
}