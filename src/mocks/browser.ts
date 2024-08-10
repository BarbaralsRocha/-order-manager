import { handlerOrderManager } from '../features/OrderManager/mocks/handlerOrderManager';
import { setupWorker } from 'msw/browser';
import { handlerOrder } from '../features/Orders/mocks/handlerOrder';

export const worker = setupWorker(...handlerOrderManager, ...handlerOrder);
