import axios from "axios";
import { SupplierResponse } from "./SupplierResponse";

const supplierEndpoints = ['dave', 'eric', 'jeff'];

async function getDave() {
  let response = axios.get('https://techtest.rideways.com/dave', {
    params: {
      pickup: '3.410632,-2.157533',
      dropoff: '3.410632,-2.157533'
    },
    timeout: 2000
  })
  return response
}

async function getEric() {
  let response = axios.get('https://techtest.rideways.com/eric', {
    params: {
      pickup: '3.410632,-2.157533',
      dropoff: '3.410632,-2.157533'
    },
    timeout: 2000
  })
  return response
}


export function retrieveSupplierInfo(pickup: string, dropoff: string) {
  const dataRetrievalPromises = supplierEndpoints.map((supplierEndpoint) => {
    return axios.get(`https://techtest.rideways.com/${supplierEndpoint}`, {
      params: {
        pickup: pickup,
        dropoff: dropoff
      }
    }).then((res) => {
      return res.data as SupplierResponse
    })
  })

  return axios.all(dataRetrievalPromises)
}