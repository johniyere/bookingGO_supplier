import request from "supertest";
import app from "../src/app.server";
import MockAdapter from "axios-mock-adapter";
import axios from 'axios';
import { SupplierResponse } from "../src/helpers/Responses";

describe('GET /random-url', () => {
  it("should return 404", () => {
    return request(app)
      .get('/random-url')
      .expect(404)
  });
})

describe('GET /api', () => {
  it("should return supplier responses", () => {
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

    const url = '/api?pickup=3.410632,-2.157533&dropoff=3.410632,-2.157533&no_of_passengers=5'

    return request(app)
      .get(url)
      .expect(200, {
        "MINIBUS": {
          supplier: 'JEFF',
          price: 500
        }
      })
  });

  it("should return 422 error on dropoff", () => {
    const url = '/api?pickup=3.410632,-2.157533&dropoff=3.410632,-2.157533asasa&no_of_passengers=5';

    return request(app).get(url)
      .expect(422, {
        "errors": [
          {
            "location": "query",
            "param": "dropoff",
            "value": "3.410632,-2.157533asasa",
            "msg": "Not correct format"
          }
        ]
      }) 
  })
})