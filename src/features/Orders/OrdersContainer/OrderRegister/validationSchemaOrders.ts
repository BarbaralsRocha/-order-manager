// eslint-disable-next-line import/no-extraneous-dependencies
import * as Yup from 'yup';

const productSchema = Yup.object().shape({
  id: Yup.string().required('Id do produto nao informado').nonNullable(),
  name: Yup.string().required('Nome não informado').nonNullable(),
  quantity: Yup.number().required('Quantidade nao informada').nonNullable(),
  type: Yup.string().required('Medida nao informada').nonNullable(),
  additionalInformations: Yup.string().nullable(),
});

const customerSchema = Yup.object().shape({
  id: Yup.string().required('Id do cliente não informado').nonNullable(),
  value: Yup.string().required('Nome do cliente não informado').nonNullable(),
});

const validationSchemaOrders = Yup.object().shape({
  id: Yup.string().nullable(),
  customer: customerSchema.required('Cliente não informado').nonNullable(),
  deliveryDate: Yup.date()
    .required('Data da entrega não informada')
    .nonNullable(),
  products: Yup.array()
    .of(productSchema)
    .required('Produto não informado')
    .min(1, 'É necessario pelo menos um produto')
    .nonNullable(),
});

export default validationSchemaOrders;
