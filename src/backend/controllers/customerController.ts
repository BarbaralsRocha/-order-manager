import { ICustomer } from '../interfaces/Customer.interface';
import { createCustomerSchema } from '../schemas/customerControllerSchema';
import {
  createCustomer as createCustomerService,
  getAllCustomers as getAllCustomersService,
  updateCustomer as updateCustomerService,
  deleteCustomer as deleteCustomerService,
} from '../services/customerService';
import { Context } from 'hono';
import * as yup from 'yup';

export const createCustomer = async (c: Context) => {
  try {
    const {
      name,
      additionalInformation,
      fantasyName,
      address,
      cnpj,
      stateRegistration,
      phoneNumber,
    } = await c.req.json();

    const body = {
      name,
      additionalInformation,
      fantasyName,
      address,
      cnpj,
      stateRegistration,
      phoneNumber,
    };

    try {
      await createCustomerSchema.validate(body, {
        abortEarly: false,
      });
      const newCustomer = await createCustomerService(body);
      return c.json({ output: newCustomer }, 201);
    } catch (validationError) {
      const errors = (validationError as yup.ValidationError).errors;
      return c.json({ validationResult: errors }, 400);
    }
  } catch (error) {
    console.error({ error });
    return c.json({ error: 'Failed to create customer' }, 500);
  }
};

export const getAllCustomers = async (c: Context) => {
  try {
    const customers = await getAllCustomersService();
    return c.json({ output: customers }, 200);
  } catch (error) {
    return c.json({ error: 'Failed to fetch customers' }, 500);
  }
};

export const updateCustomer = async (c: Context) => {
  try {
    const customerId = parseInt(c.req.param('id'), 10);
    const customerData: ICustomer = await c.req.json();
    const customerUpdated = await updateCustomerService(
      customerId,
      customerData,
    );

    return c.json({ output: customerUpdated }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create customer' }, 500);
  }
};

export const deleteCustomer = async (c: Context) => {
  try {
    const customerId = parseInt(c.req.param('id'), 10);
    const customerUpdated = await deleteCustomerService(customerId);

    return c.json({ output: customerUpdated }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create customer' }, 500);
  }
};
