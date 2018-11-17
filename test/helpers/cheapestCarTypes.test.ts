import { getCheapestCartType } from "../../src/helpers/cheapestCarTypes";
import { SupplierResponse } from "../../src/helpers/Responses";

describe('getCheapestCartType', () => {
  it('should return the cheapest type', () => {
    const suppliers: SupplierResponse[] = [
      {
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
      },
      {
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
      },
      {
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
      },
    ]
  
    const result = getCheapestCartType(suppliers)
    expect(result).toEqual({
      "STANDARD": {
        supplier: 'DAVE',
        price: 900
      },
      "EXECUTIVE": {
        supplier: 'ERIC',
        price: 1200
      },
      "LUXURY": {
        supplier: 'DAVE',
        price: 1000
      },
      "MINIBUS": {
        supplier: 'JEFF',
        price: 500
      }
    })
  })
})
