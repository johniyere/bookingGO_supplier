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