import { IOrder, IProductOrder } from '../../interfaces/IOrder.interface';
import { OrderSectionType, OrderSectionValue } from '../types/Order.type';

export const OrderSection: Record<OrderSectionType, OrderSectionValue> = {
  customers: 'Clientes',
  orders: 'Encomendas',
  products: 'Produtos',
};

export const INITIAL_VALUES_ORDERS: IOrder = {
  id: null,
  customer: {
    id: null,
    name: null,
  },
  deliveryDate: null,
  products: [],
};

export const INITIAL_VALUES_PRODUCT_ORDER: IProductOrder = {
  id: null,
  productId: null,
  name: null,
  quantity: null,
  type: null,
  additionalInformations: null,
};
