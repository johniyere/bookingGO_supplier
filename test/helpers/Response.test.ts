import { SupplierResponse, isSupplierResponse } from "../../src/helpers/Responses";

describe('isSupplierResponse', () => {
  it('should return true', () => {
    const value: SupplierResponse = {
      "supplier_id": "DAVE",
      "pickup": "51.470020,-0.454295",
      "dropoff": "51.00000,1.0000",
      "options": [
        {
            "car_type": "STANDARD",
            "price": 900
        },
      ]
    }

    expect(isSupplierResponse(value)).toBeTruthy();
  })

  it('should return false', () => {
    const value = new Error('Mock Error');
    expect(isSupplierResponse(value)).toBeFalsy();
  })
})