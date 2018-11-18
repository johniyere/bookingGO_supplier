import { Option } from "./helpers/Responses";

const options: Option[] = [
  {
    "car_type": "STANDARD",
    "price": 671808
  },
  {
    "car_type": "EXECUTIVE",
    "price": 375545
  },
  {
    "car_type": "LUXURY",
    "price": 583438
  },
  // {
  //   "car_type": "PEOPLE_CARRIER",
  //   "price": 423232
  // },
  {
    "car_type": "MINIBUS",
    "price": 37456
  }
]
const car_type_max: {[car_type: string]: number} = {
  "STANDARD": 4,
  "EXECUTIVE": 4,
  "LUXURY": 4,
  "PEOPLE_CARRIER": 6,
  "LUXURY_PEOPLE_CARRIER": 6,
  "MINIBUS": 16
}

export function limitOptions(options: Option[], no_of_passengers: number) {
  const setReturn = shouldReturn(no_of_passengers);
  const filtered = options.filter((option) => car_type_max[option.car_type] === setReturn);
  return filtered.length > 0 ? filtered : options.filter((option) => car_type_max[option.car_type] > no_of_passengers)
} 

function shouldReturn(no_of_passengers: number) {
  const arr = [4, 6, 16]
  const diff = arr.map((value) => value - no_of_passengers)
                  .filter(value => value > 0)
                  .map((value) => value + no_of_passengers);
  return diff.shift()


}


console.log(limitOptions(options, 5));