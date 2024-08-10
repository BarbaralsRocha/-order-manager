import { setupServer } from 'msw/node';
import { handlerOrderManager } from '../features/OrderManager/mocks/handlerOrderManager';
import { handlerOrder } from '../features/Orders/mocks/handlerOrder';

export const server = setupServer(...handlerOrderManager, ...handlerOrder);
