import axios from "axios";
import { SupplierResponse, TimeoutError, SupplierError } from "./Responses";

const supplierEndpoints = ['dave', 'eric', 'jeff'];

export function retrieveSupplierInfo(pickup: string, dropoff: string) {
  const dataRetrievalPromises = supplierEndpoints.map(endpoint => retrieveData(endpoint, pickup, dropoff));

  return axios.all(dataRetrievalPromises);
}

export async function retrieveData(endpoint: string, pickup: string, dropoff: string) {
  try {
    const apiResponse = await axios.get<SupplierResponse>(`https://techtest.rideways.com/${endpoint}`, {
      params: {
        pickup: pickup,
        dropoff: dropoff
      },
      timeout: 2000,
    });

    const data = apiResponse.data;
    return data
  } catch (err) {
    let customError = new Error(`Something unexpected happened when trying to retrieve data for ${endpoint}`);

    if (err.code == 'ECONNABORTED') {
      customError = new TimeoutError(err.message, endpoint)
    } 

    if (err.response && err.response.data) {
      customError = new SupplierError(err.message, err.response.data)
    }
    
    return customError;
  }

}