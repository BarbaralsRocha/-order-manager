import { delay, http, HttpResponse } from 'msw';
import { mockContract } from '../../../interfaces/IMockContract';
import { responseProfileCustomer } from './response';

export const handlerOrderManager = [
  http.get(
    `${process.env.REACT_APP_BASE_URL}/order-manager/api/v1/profile`,
    async () => {
      await delay(2000);
      return HttpResponse.json({
        ...mockContract({
          output: responseProfileCustomer(),
        }),
      });
    },
  ),
];
