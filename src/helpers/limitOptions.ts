import { Option } from "./Responses";

const car_type_max: {[car_type: string]: number} = {
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

export function improvdedLimitOptions(options: Option[], no_of_passengers: number) {
  const setReturn = shouldReturn(no_of_passengers);
  return options.filter((option) => car_type_max[option.car_type] === setReturn)
} 

function shouldReturn(no_of_passengers: number) {
  const arr = [4, 6, 16]
  const diff = arr.map((value) => value - no_of_passengers)
                  .filter(value => value > 0)
                  .sort((a, b) => a - b)
                  .map((value) => value + no_of_passengers);
  return diff.shift()

}