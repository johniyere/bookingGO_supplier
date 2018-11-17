import MockAdapter from "axios-mock-adapter";
import axios from 'axios';
import { SupplierResponse } from "../../src/helpers/Responses";
import { getCheapestSupplierOptions } from "../../src/helpers/cheapestSupplierOptions";

describe('getCheapestSupplierOptions', () => {
  it('should return cheapest supplier options', async () => {
    let mock = new MockAdapter(axios);
    const daveData: SupplierResponse = {
      "supplier_id": "DAVE",
      "pickup": "51.470020,-0.454295",
      "dropoff": "51.00000,1.0000",
      "options": [
        {
            "car_type": "STANDARD",
            "price": 900
        },
        {
            "car_type": "EXECUTIVE",
            "price": 1500
        },
        {
            "car_type": "LUXURY",
            "price": 1000
        },
      ]
    }
    const ericData: SupplierResponse = {
      "supplier_id": "ERIC",
      "pickup": "51.470020,-0.454295",
      "dropoff": "51.00000,1.0000",
      "options": [
        {
          "car_type": "STANDARD",
          "price": 1000
        },
        {
          "car_type": "EXECUTIVE",
          "price": 1200
        },
        {
          "car_type": "MINIBUS",
          "price": 1200
        }
      ]
    }
    const jeffData: SupplierResponse = {
      "supplier_id": "JEFF",
      "pickup": "51.470020,-0.454295",
      "dropoff": "51.00000,1.0000",
      "options": [
        {
          "car_type": "EXECUTIVE",
          "price": 1400
        },
        {
          "car_type": "LUXURY",
          "price": 583438
        },
        {
          "car_type": "MINIBUS",
          "price": 500
        }
      ]
    }

    mock
      .onGet('https://techtest.rideways.com/dave').reply(200, daveData)
      .onGet('https://techtest.rideways.com/eric').reply(200, ericData)
      .onGet('https://techtest.rideways.com/jeff').reply(200, jeffData);


    const pickup = '3.410632,-2.157533';
    const dropoff = '3.410632,-2.157533';
    const no_of_passengers = 5;

    expect.assertions(1)
    await expect(getCheapestSupplierOptions(pickup, dropoff, no_of_passengers)).resolves.toEqual({
      "MINIBUS": {
        supplier: 'JEFF',
        price: 500
      }
    })
  })
})