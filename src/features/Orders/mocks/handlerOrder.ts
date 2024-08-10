import { delay, http, HttpResponse } from 'msw';
import { mockContract } from '../../../interfaces/IMockContract';
import {
  responseCustomerList,
  responseOrders,
  responseProducts,
} from './response';

export const handlerOrder = [
  http.get(
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/orders/summary`,
    async () => {
      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: responseOrders(),
        }),
      });
    },
  ),

  http.get(
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/orders/customers`,
    async () => {
      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: responseCustomerList(),
        }),
      });
    },
  ),

  http.get(
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/orders/products`,
    async () => {
      await delay(3000);
      return HttpResponse.json({
        ...mockContract({
          output: responseProducts(),
        }),
      });
    },
  ),
];
