import { limitOptions } from "../../src/helpers/limitOptions";
import { Option } from "../../src/helpers/Responses";

describe('limitOptions', () => {
  it('should return limted options', () => {
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
      {
        "car_type": "PEOPLE_CARRIER",
        "price": 423232
      },
      {
        "car_type": "MINIBUS",
        "price": 37456
      }
    ]
    const no_of_passengers = 5;
  
    const result  = limitOptions(options, no_of_passengers)
    expect(result.length).toEqual(1);
    expect(result).toEqual([{"car_type": "PEOPLE_CARRIER","price": 423232}])
  })
})