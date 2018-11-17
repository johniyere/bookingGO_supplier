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

export type CarTypes = {[car_type: string]: {supplier: string, price: number}};

export interface SupplierErroResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
export class SupplierError extends Error {
  name = 'Supplier Error';
  
  constructor(message: string, public response: SupplierErroResponse) {
    super(message);    
  }
}

export class TimeoutError extends Error {
  name = 'Timeout Error';

  constructor(message: string, public endpoint: string) {
    super(message);
  }
}

export function isSupplierResponse(value: SupplierResponse | Error): value is SupplierResponse {
  return (<SupplierResponse>value).supplier_id !== undefined;
}

