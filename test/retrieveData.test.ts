import { retrieveData } from "../src/retrieveData";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SupplierResponse } from "../src/SupplierResponse";
import { doesNotReject } from "assert";

it('calls axios and returns supplier information', async () => {
  var mock = new MockAdapter(axios);
  const data: SupplierResponse = {
    "supplier_id": "DAVE",
    "pickup": "51.470020,-0.454295",
    "dropoff": "51.00000,1.0000",
    "options": [
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
          "car_type": "MINIBUS",
          "price": 37456
      }
    ]
  };

  mock.onGet('https://techtest.rideways.com/dave').reply(200, data)
  const pickup = '3.410632,-2.157533';
  const dropoff = '3.410632,-2.157533';
  expect.assertions(1)
  await expect(retrieveData('dave', pickup, dropoff)).resolves.toEqual(data)
})