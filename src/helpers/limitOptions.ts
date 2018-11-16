import { Option } from "./Responses";

const car_type_max: {[s: string]: number} = {
  "STANDARD": 4,
  "EXECUTIVE": 4,
  "LUXURY": 4,
  "PEOPLE_CARRIER": 6,
  "LUXURY_PEOPLE_CARRIER": 6,
  "MINIBUS": 16
}

export function limitOptions(options: Option[], no_of_passengers: number) {
  const filtered = options.filter((option) => {
    return car_type_max[option.car_type] > no_of_passengers
  })
  return filtered
}