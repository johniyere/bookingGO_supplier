import { AxiosError } from "axios";

export interface SupplierResponse {
  supplier_id: string;
  pickup: string;
  dropoff: string;
  options: Option[]
}

export interface Option {
  car_type: string;
  price: number;
}

export interface SupplierErroResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
export class SupplierError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Supplier Error'
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Timeout Error'
  }
}