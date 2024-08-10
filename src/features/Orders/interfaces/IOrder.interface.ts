import { Measurement } from '../utils/types/Order.type';

export interface IOrder {
  id: number | null;
  customer: {
    id: number | null;
    name: string | null;
  };
  deliveryDate: string | null;
  products: IProductOrder[];
}

export interface IProductOrder {
  id: number | null;
  productId: number | null;
  name: string | null;
  quantity: number | null;
  type: Measurement | null;
  additionalInformations: string | null;
}

export type OrderKeys = keyof IOrder;
export type OrderValues = IOrder[OrderKeys];

export type ProductOrderKeys = keyof IProductOrder;
export type ProductOrderValues = IProductOrder[ProductOrderKeys];
