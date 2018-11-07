import axios from "axios";
import { SupplierResponse } from "./SupplierResponse";

const supplierEndpoints = ['dave', 'eric', 'jeff'];

export function retrieveSupplierInfo(pickup: string, dropoff: string) {
  const dataRetrievalPromises = supplierEndpoints.map(endpoint => retrieveData(endpoint, pickup, dropoff))


  return axios.all(dataRetrievalPromises)
}

export async function r(pickup: string, dropoff: string) {
  const dataRetrievalPromises = supplierEndpoints.map(endpoint => retrieveData(endpoint, pickup, dropoff))

  const results = await axios.all(dataRetrievalPromises)
}

async function retrieveData(endpoint: string, pickup: string, dropoff: string) {
  const apiResponse = await axios.get<SupplierResponse>(`https://techtest.rideways.com/${endpoint}`, {
    params: {
      pickup: pickup,
      dropoff: dropoff
    }
  })

  const data = apiResponse.data
  return data
}