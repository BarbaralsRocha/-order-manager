import { IOptionSelect } from '../interfaces/ICommon.interface';
import { IOrder } from '../interfaces/IOrder.interface';

export const responseOrders = (): IOrder[] => [
  {
    id: 1,
    customer: { id: 1, name: 'Vovo geralda' },
    deliveryDate: '2024-07-21T09:00:00.000Z',
    products: [
      {
        id: 1,
        productId: 2,
        name: 'Pão de doce',
        quantity: 100,
        type: 'UN',
        additionalInformations: 'cortado e embalado',
      },
      {
        id: 2,
        productId: 1,
        name: 'Pão de sal',
        quantity: 100,
        type: 'UN',
        additionalInformations: 'cortado e embalado',
      },
    ],
  },
  {
    id: 2,
    customer: { id: 2, name: 'Murilo Rubião' },
    deliveryDate: '2024-07-21T09:00:00.000Z',
    products: [
      {
        id: 1,
        productId: 2,
        name: 'Pão de doce',
        quantity: 100,
        type: 'UN',
        additionalInformations: 'cortado e embalado',
      },
      {
        id: 2,
        productId: 1,
        name: 'Pão de sal',
        quantity: 100,
        type: 'UN',
        additionalInformations: 'cortado e embalado',
      },
    ],
  },
];

export const responseCustomerList = (): IOptionSelect[] => [
  { id: 1, value: 'Vovo Geralda' },
  { id: 2, value: 'Murilo' },
  { id: 3, value: 'Abdala' },
];

export const responseProducts = (): IOptionSelect[] => [
  { id: 1, value: 'Pão de sal' },
  { id: 2, value: 'Pão de doce' },
];
