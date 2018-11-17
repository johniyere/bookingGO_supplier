import { retrieveData, retrieveSupplierInfo } from "../../src/helpers/retrieveData";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SupplierResponse, TimeoutError, SupplierError } from "../../src/helpers/Responses";


describe('retrieveData', () => {
  it('calls axios and returns supplier information', async () => {
    let mock = new MockAdapter(axios);
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
  
  it('should return timeout error', async () => {
    let mock = new MockAdapter(axios);
  
    mock.onGet('https://techtest.rideways.com/dave').timeout()
    const endPoint = 'dave'
    const pickup = '3.410632,-2.157533';
    const dropoff = '3.410632,-2.157533';
    expect.assertions(1)
    
    await expect(retrieveData(endPoint, pickup, dropoff)).resolves.toBeInstanceOf(TimeoutError)
  })
  
  it('should return supplier error', async () => {
    let mock = new MockAdapter(axios);
    const data = {
      "timestamp": "2018-08-14T13:12:34.072+0000",
      "status": 500,
      "error": "Internal Server Error",
      "message": "Something has gone wrong",
      "path": "/dave"
    }
  
    mock.onGet('https://techtest.rideways.com/dave').reply(500,data)
    const endPoint = 'dave'
    const pickup = '3.410632,-2.157533';
    const dropoff = '3.410632,-2.157533';
    expect.assertions(1)
    
    await expect(retrieveData(endPoint, pickup, dropoff)).resolves.toBeInstanceOf(SupplierError)
  })
})

describe('retrieveSupplierInfo', () => {
  it('should perform multiple requests', async () => {
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
  
    expect.assertions(1)
    await expect(retrieveSupplierInfo(pickup, dropoff)).resolves.toEqual([daveData, ericData,jeffData])
  })
})
